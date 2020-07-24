import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../service/jwt.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(public jwtService: JwtService) { }

  ngOnInit() {
  }

}
