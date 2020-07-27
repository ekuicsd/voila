import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-register',
  templateUrl: './show-register.component.html',
  styleUrls: ['./show-register.component.scss']
})
export class ShowRegisterComponent implements OnInit {

  routerSubscription: Subscription;

  constructor(private router: Router) { }

  ngOnInit() {
    this.routerSubscription = this.router.events
        .subscribe(event => {
            document.body.scrollTop = 0;
        });
  }

  navigateToRegisterPage() {
    this.router.navigateByUrl('/guide/register');
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

}
