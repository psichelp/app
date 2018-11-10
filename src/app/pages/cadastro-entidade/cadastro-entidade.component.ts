import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DengodbService } from 'src/app/services/dengodb/dengodb.service';
import { SERVICO } from 'src/app/services/local/tipos-de-servico';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-entidade',
  templateUrl: './cadastro-entidade.component.html',
  styleUrls: ['./cadastro-entidade.component.css']
})
export class CadastroEntidadeComponent implements OnInit {
  
  control: FormControl;
  constructor(private fb: FormBuilder, private dengodb: DengodbService, private router: Router, private http: HttpClient) {}
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

  solicitarCadastro() {
    console.warn(this.entidadeForm.value);
    let entidade = this.entidadeForm.value;
    entidade.ativo = false;
    let r = this.dengodb.insert(entidade, 'test');
    console.log(r);
    this.telegramMessage("Novo cadastro " + JSON.stringify(entidade, null, '  ') ).subscribe(data => {
      console.log('Mensagem de cadastro enviada com sucesso', data);
    },
      error => {
        console.error('Erro ao enviar mensagem de cadastro', error);
      }
    );
    alert("Muito obrigado! Cadastro efetuado com sucesso");
    this.router.navigate(['/'])
  }
}
