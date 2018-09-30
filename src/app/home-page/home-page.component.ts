import { Component, OnInit } from '@angular/core';
import { Router, UrlHandlingStrategy } from '@angular/router';
import { Url } from 'url';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  listar(servico: String) {
    this.router.navigate(['/listar', { servico: servico }])
  }

  irPara(url: string){
    window.open(url);
  }

}
