import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.css']
})
export class SocialShareComponent implements OnInit {

  @Input() urlToBeShared: string;

  constructor() { }

  ngOnInit() {
  }

  UrlToBeShared(){
    return encodeURIComponent(this.urlToBeShared);
  }

  Titulo(){
    return encodeURIComponent("PSICOHELP ajuda emocional para todos: ");
  }



}
