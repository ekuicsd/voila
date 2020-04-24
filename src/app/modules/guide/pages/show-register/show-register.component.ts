import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-register',
  templateUrl: './show-register.component.html',
  styleUrls: ['./show-register.component.scss']
})
export class ShowRegisterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToRegisterPage() {
    this.router.navigateByUrl('/guide/register');
  }

}
