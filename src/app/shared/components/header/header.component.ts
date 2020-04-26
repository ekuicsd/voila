import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtService } from '../../service/jwt.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModalDirective} from 'node_modules/angular-bootstrap-md';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor(
    private userService: UserService) { }

  ngOnInit() {

  }

  logout() {
    this.userService.logout('tourist');
  }

}
