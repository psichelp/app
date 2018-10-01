import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SERVICO_DESCRICAO } from 'src/app/services/local/tipos-de-servico';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  tiposServicos = SERVICO_DESCRICAO;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  listar(servico: any) {
    if(servico.url){
      window.open(servico.url);
    }else{
      this.router.navigate(['/listar', { servico: servico.nome }])
    }
  }
}
