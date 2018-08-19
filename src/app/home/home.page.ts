import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}


  listar(servico: String) {
    this.router.navigate(['/list', { servico: servico }])
    // this.navCtrl.push(LocaisPage, {
    //   servico: servico
    // });
  }
  
  goToSearch() {
    // this.navCtrl.push(SearchPage);
  }

}
