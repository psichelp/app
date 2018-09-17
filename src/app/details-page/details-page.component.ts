import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  estabelecimento: any;
  paramsSubscription: Subscription;

  constructor(private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.estabelecimento = null;
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.estabelecimento = JSON.parse(params['local']);
          console.dir(this.estabelecimento);
        }
      );
  }

}
