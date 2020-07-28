import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss']
})
export class FrontpageComponent implements OnInit {

  routerSubscription: Subscription;

  constructor(private router: Router) { }

  ngOnInit() {
    this.routerSubscription = this.router.events
        .subscribe(event => {
            document.body.scrollTop = 0;
        });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

}
