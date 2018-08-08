import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap
} from 'rxjs/operators';
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
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalServiceProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');

    this.estabelecimentos$ = this.searchQuery.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((query: string) => this.localService.searchByQuery(query)),

      // TODO: se quiser, dá para "mapear" cada trecho encontrado na busca "fuzzy"
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
}
