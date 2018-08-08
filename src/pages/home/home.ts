import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalServiceProvider } from '../../providers/local-service/local-service';
import { LocaisPage } from '../locais/locais';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public locais: LocalServiceProvider
  ) {
    // console.log(locais.obterEstabelecimentosPorServico("Grupo para crianças"));
  }

  listar(servico: String) {
    this.navCtrl.push(LocaisPage, {
      servico: servico
    });
  }
  
  goToSearch() {
    this.navCtrl.push(SearchPage);
  }
}
