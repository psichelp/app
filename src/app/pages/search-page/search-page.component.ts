import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Estabelecimento } from '../../services/local/estabelecimento';
import { LocalService } from '../../services/local/local.service';
import { WhatsAppService } from '../../services/whatsapp/whats-app.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  estabelecimentos$: Observable<Estabelecimento[]>;
  private searchQuery = new Subject<string>();
  @ViewChild('searchBox') searchBox: ElementRef;


  constructor(
    private localService: LocalService,
    private router: Router,
    private whatsapp: WhatsAppService

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
    this.router.navigate(['/detalhes', {local: SharedService.b64EncodeUnicode(JSON.stringify(estabelecimento))} ]);
  }

  onClickWhatsApp(estabelecimento: Estabelecimento) {
    if (!estabelecimento.whatsapp) {
      alert('Este contato não possui whatsapp.');
      return;
    }
    this.whatsapp.message(estabelecimento.whatsapp);
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

  ngAfterViewInit() {
    this.searchBox.nativeElement.focus();
  }

}
