import { Injectable } from '@angular/core';
import * as Fuse from 'fuse.js';
import { Observable, of } from 'rxjs';
import { Estabelecimento } from './estabelecimento';
import { LocalstorageService } from '../localstorage/localstorage.service';
import { map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private fuseInstance;

  constructor(private http: HttpClient, private localstorage: LocalstorageService) {
  }

  public loadEstabelecimentos() {
    let estabelecimentosLocais = this.localstorage.getStorage('estabelecimentos');
    if (!estabelecimentosLocais) {
      this.getLocalEstabelecientosJson().subscribe(localData => {
        this.localstorage.setStorage('estabelecimentos', localData);
        console.log("Número de estabelecimentos locais", localData.length);
        this.getRemoteEstabelecientosJson().subscribe(remoteData => {
          this.localstorage.setStorage('estabelecimentos', remoteData);
          console.log("Número de estabelecimentos remotos", remoteData.length);
        });
      });
    } else {
      console.log("Número de estabelecimentos locais", estabelecimentosLocais.length);
      this.getRemoteEstabelecientosJson().subscribe(remoteData => {
        this.localstorage.setStorage('estabelecimentos', remoteData);
        console.log("Número de estabelecimentos remotos", remoteData.length);
      });
    }
  }

  getLocalEstabelecientosJson(): Observable<any> {
    let apiUrl = "assets/data/estabelecimentos.json";
    return this.http.get(apiUrl)
      .pipe(map(res => {
        let results = res as Estabelecimento[];
        return results.filter(estabelecimento => {
          return estabelecimento.ativo === true;
        });
      }));
  }

  getRemoteEstabelecientosJson(): Observable<any> {
    let apiUrl = "https://raw.githubusercontent.com/psichelp/app/master/src/assets/data/estabelecimentos.json";
    return this.http.get(apiUrl)
      .pipe(map(res => {
        let results = res as Estabelecimento[];
        return results.filter(estabelecimento => {
          return estabelecimento.ativo === true;
        });
      }));
  }

  estabelecimentos() {
    return this.localstorage.getStorage('estabelecimentos');
  }

  public estabelicimentoCache: any;

  obterEstabelecimentosPorServico(servicoDesejado: String): Estabelecimento[] {
    servicoDesejado = servicoDesejado.toLowerCase();
    return this.estabelecimentos().filter(estabelecimento => {
      return estabelecimento.servicos.some(servico => {
        return servicoDesejado === servico.toLocaleLowerCase();
      });
    });
  }

  /**
   * Realiza uma busca "fuzzy" com base na query.
   * Referência: http://fusejs.io/
   */
  searchByQuery(query: string): Observable<Array<any>> {
    if (!query.trim()) {
      // if not search query, return empty array.
      return of([]);
    }

    const result = this.getFuseInstance().search(query);
    console.log({ result });
    return of(result);
  }

  private getFuseInstance(): Fuse {
    if (!this.fuseInstance) {
      const list = this.estabelecimentos();
      const options = {
        keys: [
          // {name: 'end', weight: 0.7},
          'end',
          'nome',
          'email',
          'valor',
          'servicos',
          'descricao_servicos'
        ],
        // id: 'nome'
        shouldSort: true,
        includeMatches: true,
        threshold: 0.3,
        findAllMatches: true,
        tokenize: true,
        // location: 0,
        // distance: 100,
        // maxPatternLength: 32,
        minMatchCharLength: 3,
      };
      this.fuseInstance = new Fuse(list, options);
    }
    return this.fuseInstance;
  }

}


