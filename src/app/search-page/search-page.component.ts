import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Estabelecimento } from '../services/local/estabelecimento';
import { LocalService } from '../services/local/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  estabelecimentos$: Observable<Estabelecimento[]>;
  private searchQuery = new Subject<string>();


  constructor(
    private localService: LocalService,
    private router: Router

  ) { }

  ngOnInit() {
    // carrega a lista de estabelecimentos
    this.estabelecimentos$ = this.searchQuery.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => this.localService.searchByQuery(query)),
      // NOTE: se quiser, dá para "mapear" cada trecho encontrado na busca "fuzzy", marcando no HTML os termos.
      map(results => results.map(result => result.item))
    );

  }

  search(query: string) {
    console.log(query);
    
    this.searchQuery.next(query);
  }

  mostrarDetalhes(estabelecimento: any) {
    this.router.navigate(['/detalhes', {local:  JSON.stringify(estabelecimento)} ]);
  }

  onClickWhatsApp(estabelecimento: Estabelecimento) {
    if (!estabelecimento.whatsapp) {
      alert('Este contato não possui whatsapp.');
      return;
    }

    const phone = estabelecimento.whatsapp.split('/')[0].replace(/\D/g, ''); // only numbers
    const message = 'Olá, gostaria de ...';
    let url;

    // if (this.platform.is('cordova')) {
    //   url = `whatsapp://send?text=${message}&phone=${phone}`;
    // } else {
    //   // OPÇÃO 1 - com mensagem pré definida
      // const encodedText = encodeURI(message);
      // url = `https://wa.me/55${phone}?text=${encodedText}`;

      // OPÇÃO 2 - sem mensagem pré-definida
      const prefix = '55';
      url = `https://wa.me/${prefix}${phone}`;
    // }
    window.open(url, '_system', 'location=yes');
  }

  onClickCall(estabelecimento: Estabelecimento) {
    if (!estabelecimento.tel) {
      alert('Este contato não possui telefone.');
      return;
    }

    const number = estabelecimento.tel.split('/')[0].replace(/\D/g, ''); // only numbers;
    const url = `tel://${number}`;
    window.open(url, '_system', 'location=yes');

    // NOTE: plugin callNumber - https://ionicframework.com/docs/native/call-number/
    // this.callNumber.callNumber(estabelecimento.tel, true)
    // .then(res => console.log('Launched dialer!', res))
    // .catch(err => console.log('Error launching dialer', err));
  }



}
