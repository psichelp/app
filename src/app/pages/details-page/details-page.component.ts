import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { WhatsAppService } from '../../services/whatsapp/whats-app.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {
  estabelecimento: any;
  paramsSubscription: Subscription;
  telegramUrl = 'https://api.telegram.org/bot747846139:AAEpVYndvdgt6pQRcNyGex7A283hg3qlk0c/sendMessage?chat_id=569816047&text=';


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private whatsapp: WhatsAppService,
    private http: HttpClient) { }

  ngOnInit() {
    this.estabelecimento = null;
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      let local = SharedService.b64DecodeUnicode(params['local']);
      this.estabelecimento = JSON.parse(local);
      console.dir(this.estabelecimento);
      this.telegramMessage(JSON.stringify(this.estabelecimento, null, '  ') + " foi acessado").subscribe(data => {
        console.log('Mensagem de cadastro enviada com sucesso', data);
      },
        error => {
          console.error('Erro ao enviar mensagem', error);
        });
    });
  }

  onClickLigar() {
    const tel = this.estabelecimento.tel;
    window.open(`tel:${tel}`);
    this.telegramMessage(JSON.stringify(this.estabelecimento, null, '  ') +  " foi ligado").subscribe(data => {
      console.log('Mensagem de cadastro enviada com sucesso', data);
    },
      error => {
        console.error('Erro ao enviar mensagem', error);
      });
  }

  onClickWhatsApp() {
    this.whatsapp.message(this.estabelecimento.whatsapp);
    this.telegramMessage(JSON.stringify(this.estabelecimento, null, '  ') + " foi contactado por WhatsApp").subscribe(data => {
      console.log('Mensagem de cadastro enviada com sucesso', data);
    },
      error => {
        console.error('Erro ao enviar mensagem', error);
      });
  }

  telegramMessage(mensagem): Observable<any> {
    console.log(mensagem);
    mensagem = encodeURI(mensagem);
    
    let apiUrl = `${this.telegramUrl}${mensagem}`;
    return this.http.get(apiUrl)
      .pipe(map(res => {
        let results = res;
        console.log(res);
        
        return results;
      }));
  }
}
