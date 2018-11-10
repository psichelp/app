import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DengodbService } from 'src/app/services/dengodb/dengodb.service';
import { SERVICO } from 'src/app/services/local/tipos-de-servico';

@Component({
  selector: 'app-cadastro-entidade',
  templateUrl: './cadastro-entidade.component.html',
  styleUrls: ['./cadastro-entidade.component.css']
})
export class CadastroEntidadeComponent implements OnInit {
  
  control: FormControl;
  constructor(private fb: FormBuilder, private dengodb: DengodbService) {
    // this.control=this.entidadeForm;
  }

  servicosTipos = Object.values(SERVICO);

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
    descricao_servicos:[''],
    mapa: [''],
    video: [''],
    bairros_atendidos: [''],
    crp: [''],
    crm: [''],
  });

  ngOnInit() {

  }

  cadastrar(){
    console.log(this.entidadeForm.value);
  }

  get servicos() {
    return this.entidadeForm.get('servicos') as FormArray;
  }

  addServico() {
    this.servicos.push(this.fb.control(''));
  }

  // get aliases() {
  //   return this.profileForm.get('aliases') as FormArray;
  // }

  // updateProfile() {
  //   this.profileForm.patchValue({
  //     firstName: 'Nancy',
  //     address: {
  //       street: '123 Drew Street'
  //     }
  //   });
  // }

  // addAlias() {
  //   this.aliases.push(this.fb.control(''));
  // }

  solicitarCadastro() {
    // TODO: Use EventEmitter with form value
    console.warn(this.entidadeForm.value);
    let entidade = this.entidadeForm.value;
    entidade.ativo = false;
    let r = this.dengodb.insert(entidade, 'test');
    console.log(r);

  }
}
