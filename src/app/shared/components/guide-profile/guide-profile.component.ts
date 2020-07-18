import { Component, OnInit, ViewChild } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { SearchService } from '../../service/search.service';
import { StaticDataService } from '../../service/static-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Booking } from '../../models/booking.model';
import { MDBModalService } from 'angular-bootstrap-md';
import { UserService } from '../../service/user.service';
import { TouristsService } from '../../service/tourists.service';
@Component({
  selector: 'app-guide-profile',
  templateUrl: './guide-profile.component.html',
  styleUrls: ['./guide-profile.component.scss']
})
export class GuideProfileComponent implements OnInit {

 @ViewChild('personalTour', { static: false}) modal: MDBModalService
  public guideId: any;
  public guide: any;
  public dealList: any[];

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router:Router,
              private searchService: SearchService)
      { 
     }

  ngOnInit() {
    // this.createForm();
    this.guideId = this.route.snapshot.params.id;
    console.log(this.guideId);
    if(this.guideId) {
      this.searchService.getGuideById(this.guideId).subscribe( res => {
        this.guide = res.guide;
        this.dealList = res.guide.deals;
        console.log(res);
      });
    }
  }

  openModal(content) {
    if(this.userService.isAuthenticated && this.userService.getUser('tourist')) {
    this.modal.show(content);
    } else {
    this.router.navigateByUrl('/login');
    }
  }

}
