import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

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
