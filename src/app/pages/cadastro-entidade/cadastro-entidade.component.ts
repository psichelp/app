import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-entidade',
  templateUrl: './cadastro-entidade.component.html',
})
export class CadastroEntidadeComponent implements OnInit {

  profileForm = this.fb.group({
    nome: ['', Validators.required],
    end: [''],
    tel: [''],
    whatsapp: [''],
    email: [''],
    valor: [''],
    servicos: [''],
    //   descricao_servicos:[''],
    mapa: [''],
    video: [''],
    bairros_atendidos: [''],
    crp: [''],
    crm: [''],
  });

  ngOnInit() {

  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  constructor(private fb: FormBuilder) { }


  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}
