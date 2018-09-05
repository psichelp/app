import { Injectable } from '@angular/core';
import { ESTABELECIMENTOS } from './estabelecimentos';
import * as Fuse from 'fuse.js';
import { Observable, of } from 'rxjs';
import { Estabelecimento } from './estabelecimento';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private fuseInstance;

  constructor() { }

  public estabelicimentoCache: any;

  obterEstabelecimentosPorServico(servicoDesejado: String): Estabelecimento[] {
    servicoDesejado = servicoDesejado.toLowerCase();

    return ESTABELECIMENTOS.filter(estabelecimento => {
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
      const list = ESTABELECIMENTOS;
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
        threshold: 0.5,
        findAllMatches: true,
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


