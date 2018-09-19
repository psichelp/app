import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppService {

  constructor() { }

  message(number: string) {
    const phone = number.split('/')[0].replace(/\D/g, ''); // only numbers
    const message = 'Olá, gostaria de conversar sobre uma consulta';
    let url;

    // if (this.platform.is('cordova')) {
    //   url = `whatsapp://send?text=${message}&phone=${phone}`;
    // } else {
    //   // OPÇÃO 1 - com mensagem pré definida
    // const encodedText = encodeURI(message);
    // url = `https://wa.me/55${phone}?text=${encodedText}`;

    // OPÇÃO 2 - sem mensagem pré-definida
    var prefix = '55';
    if (number.startsWith('55') || number.startsWith('+55')) {
      prefix = ''
    }
    // url = `https://wa.me/${prefix}${number}`;
    //url = `whatsapp:${prefix}${number}`;
    url = `https://api.whatsapp.com/send?phone=${prefix}${number}&text=${message}`

    // }
    window.open(url, '_system', 'location=yes');
  }

}
