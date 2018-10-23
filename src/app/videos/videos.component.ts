import { Component, OnInit } from '@angular/core';

// Atributos da classe 'Hero'
import { Video }   from '../video';
// Conteúdo do Array na classe 'Video'
import { VIDEOS } from '../mock-videos';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})

export class VideosComponent implements OnInit {

  videos = VIDEOS;

  // Primeiro vem o constructor
  constructor() {
  }

  // Depois vem o ngOnInit
  ngOnInit() {
  }
}