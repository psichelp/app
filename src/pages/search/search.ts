import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Estabelecimento } from '../../providers/local-service/estabelecimento';
import { LocalServiceProvider } from '../../providers/local-service/local-service';
import { DetalhePage } from '../detalhe/detalhe';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  estabelecimentos$: Observable<Estabelecimento[]>;
  private searchQuery = new Subject<string>();

  constructor(
    private platform: Platform,
    private localService: LocalServiceProvider,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {

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
    this.searchQuery.next(query);
  }

  mostrarDetalhes(estabelecimento: any) {
    this.navCtrl.push(DetalhePage, {
      estabelecimento: estabelecimento
    });
  }

  onClickWhatsApp(estabelecimento: Estabelecimento) {
    if (!estabelecimento.whatsapp) {
      this.showErrorAlert('Este contato não possui whatsapp.');
      return;
    }

    const phone = estabelecimento.whatsapp.split('/')[0].replace(/\D/g, ''); // only numbers
    const message = 'Olá, gostaria de ...';
    let url;

    if (this.platform.is('cordova')) {
      url = `whatsapp://send?text=${message}&phone=${phone}`;
    } else {
      // OPÇÃO 1 - com mensagem pré definida
      // const encodedText = encodeURI(message);
      // url = `https://wa.me/55${phone}?text=${encodedText}`;

      // OPÇÃO 2 - sem mensagem pré-definida
      const prefix = '55';
      url = `https://wa.me/${prefix}${phone}`;
    }
    window.open(url, '_system', 'location=yes');
  }

  onClickCall(estabelecimento: Estabelecimento) {
    if (!estabelecimento.tel) {
      this.showErrorAlert('Este contato não possui telefone.');
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

  private showErrorAlert(message: string) {
    const alert = this.alertCtrl.create({
      title: 'Oops!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
