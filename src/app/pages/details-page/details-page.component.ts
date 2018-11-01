import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WhatsAppService } from '../../services/whatsapp/whats-app.service';
import { SharedService } from 'src/app/services/shared/shared.service';


@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html'
})
export class DetailsPageComponent implements OnInit {
  estabelecimento: any;
  paramsSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private whatsapp: WhatsAppService) { }

  ngOnInit() {
    this.estabelecimento = null;
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      let local = SharedService.b64DecodeUnicode(params['local']);
      this.estabelecimento = JSON.parse(local);
      console.dir(this.estabelecimento);
    });
  }

  onClickLigar() {
    const tel = this.estabelecimento.tel;
    window.open(`tel:${tel}`);
  }

  onClickWhatsApp() {
    this.whatsapp.message(this.estabelecimento.whatsapp);
  }
}
