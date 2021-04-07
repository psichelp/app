import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  constructor(private http: HttpClient) { }

  telegramUrl = 'https://api.telegram.org/bot747846139:AAES926AKuygvC5QYC8-AuqQdJIUsBWdTlE/sendMessage?chat_id=569816047&text=';

  send(message: string){
    this.prepareSend(message).subscribe(data => {
  },
    error => {
      console.error('Erro ao enviar mensagem', error);
    });
  }

  prepareSend(mensagem: string): Observable<any> {
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
