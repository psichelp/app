import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalService } from '../services/local/local.service';


@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private localService: LocalService) {
  }


  servico: String;
  locais: any;
  paramsSubscription: Subscription;


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
    this.router.navigate(['/detalhes', {local:  JSON.stringify(local)} ]);
  }


}




