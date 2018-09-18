import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html'
})
export class DetailsPageComponent implements OnInit {
  estabelecimento: any;
  paramsSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.estabelecimento = null;
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.estabelecimento = JSON.parse(params['local']);
      console.dir(this.estabelecimento);
    });
  }

  onClickLigar() {
    const tel = this.estabelecimento.tel;
    window.open(`tel:${tel}`);
  }

  onClickWhatsApp() {
    const whatsapp = this.estabelecimento.whatsapp;
    window.open(`whatsapp:${whatsapp}`);
  }
}
