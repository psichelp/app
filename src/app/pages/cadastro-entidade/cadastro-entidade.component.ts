import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { DengodbService } from 'src/app/services/dengodb/dengodb.service';
import { SERVICO } from 'src/app/services/local/tipos-de-servico';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastro-entidade',
  templateUrl: './cadastro-entidade.component.html',
  styleUrls: ['./cadastro-entidade.component.css']
})
export class CadastroEntidadeComponent implements OnInit {

  control: FormControl;
  constructor(private fb: FormBuilder, private dengodb: DengodbService, private router: Router, private http: HttpClient) { }
  telegramUrl = 'https://api.telegram.org/bot747846139:AAEpVYndvdgt6pQRcNyGex7A283hg3qlk0c/sendMessage?chat_id=569816047&text=';

  servicosTipos = Object.values(SERVICO).sort();

  entidadeForm = this.fb.group({
    nome: ['', Validators.required],
    end: [''],
    tel: [''],
    whatsapp: [''],
    email: ['', Validators.email],
    valor: [''],
    servicos: this.fb.array([
      this.fb.control('')
    ]),
    descricao_servicos: [''],
    mapa: [''],
    video: [''],
    bairros_atendidos: [''],
    crp: [''],
    crm: [''],
  });

  ngOnInit() { }

  cadastrar() {
    console.log(this.entidadeForm.value);
  }

  get servicos() {
    return this.entidadeForm.get('servicos') as FormArray;
  }

  addServico() {
    this.servicos.push(this.fb.control(''));
  }

  telegramMessage(mensagem): Observable<any> {
    mensagem = encodeURI(mensagem);
    let apiUrl = `${this.telegramUrl}${mensagem}`;
    return this.http.get(apiUrl)
      .pipe(map(res => {
        let results = res;
        return results;
      }));
  }

  get entidade() {
    return this.entidadeForm.value;
  }

  validar(): Boolean {
    let servicosQt = this.entidade.servicos.length;
    console.log(servicosQt);
    if (servicosQt < 1) {
      alert("É necessário informar pelo menos um tipo de serviço");
      return false;
    }
    if (!this.entidade.whatsapp && !this.entidade.tel && !this.entidade.email) {
      alert("É necessário informar pelo menos uma forma para entrar em contato: Telfone ou whatsApp ou email");
      return false;
    }
    return true;
  }

  solicitarCadastro() {

    this.entidade.servicos = this.entidade.servicos.filter(el => {
      return el != "";
    });

    if (!this.validar()) {
      return;
    }
    console.warn(this.entidade);
    let entidade = this.entidade;
    entidade.ativo = false;
    let dengodb = this.dengodb;

    const observable = Observable.create( (observer) => {
      dengodb.insert(entidade, environment.entityFile, observer);
    });

    observable.subscribe({
      next: x => {
        if (x === 'ok') {
          try {
            this.telegramMessage("Novo cadastro " + JSON.stringify(entidade, null, '  ')).subscribe(data => {
              console.log('Mensagem de cadastro enviada com sucesso', data);
            },
              error => {
                console.error('Erro ao enviar mensagem de cadastro', error);
              }
            );
            alert("Muito obrigado! Cadastro solicitação de cadastro efetuada com sucesso. Em breve iremos entrar em contato. Muito obrigao por ajudar!");
          } catch (error) {
            alert("Aparentemente você está sem conexão com internet. Por favor tente mais tarde ou contacte: psichelpcontatos@gmail.com para informar o acontecido. Obrigado!")
          } finally {
            this.router.navigate(['/']);
          }
        } else {
          alert("Aparentemente você está sem conexão com internet. Por favor tente mais tarde ou contacte: psichelpcontatos@gmail.com para informar o acontecido. Obrigado!")
          this.router.navigate(['/']);
        }
      },
      error: err => {
        alert("Aparentemente você está sem conexão com internet. Por favor tente mais tarde ou contacte: psichelpcontatos@gmail.com para informar o acontecido. Obrigado!")
        this.router.navigate(['/']);
      }      
    });
  }
}
