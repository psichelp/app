import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { LocalServiceProvider } from '../../providers/local-service/local-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  servico: String;
  locais: any;
  paramsSubscription: Subscription;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private localService: LocalServiceProvider) {
  }

  ngOnInit() {
    this.locais = null;
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.servico = params['servico'];
          this.locais = this.localService.obterEstabelecimentosPorServico(this.servico);
          console.log(this.locais);
        }
      );
  }
  
  goToDetails(local: any) {
    this.router.navigate(['/details', {local:  JSON.stringify(local)} ]);
  }

  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
