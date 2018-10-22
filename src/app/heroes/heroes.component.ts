import { Component, OnInit } from '@angular/core';

// Atributos da classe 'Hero'
// import { Hero }   from '../hero';
// Conteúdo do Array na classe 'Hero'
// import { HEROES } from '../mock-heroes';

// Atributos da classe 'Estabelecimento'
// import { Estabelecimento } from '../services/local/estabelecimento';
// Conteúdo do Array na classe 'Hero'
import { ESTABELECIMENTOS } from '../services/local/estabelecimentos';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  //hero = "WindStorm";
  //hero: Hero = {
  //  id: 1,
  //  name: 'Windstorm'
  //};
  heroes = ESTABELECIMENTOS; // HEROES;
  // selectedHero: Hero;

  // Primeiro vem o constructor
  constructor() {
  }

  // Depois vem o ngOnInit
  ngOnInit() {
  }

  // Depois vem outros metodos
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }  
}