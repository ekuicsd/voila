import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Deals } from '../models/deals.model';
import * as moment from 'moment';
@Injectable({
    providedIn: 'root'
})
export class SearchService {

    searchForm: FormGroup;
    public today = moment().toDate();
    public afterFour = moment().add(4, 'days').toDate();
    public city = 'Delhi';
    public range = {
      dateRange: {
        isRange: true,
        beginDate: {
          day: this.today.getDate(),
          month: this.today.getMonth() + 1,
          year: this.today.getFullYear()
        },
        beginJsDate: this.today,
        endDate: {
          day: this.afterFour.getDate(),
          month: this.afterFour.getMonth() + 1,
          year: this.afterFour.getFullYear()
        },
        endJsDate: this.afterFour,
        formatted: this.dateToFormat(),
        beginEpoc: 0,
        endEpoc: 0
      },
      isRange: true,
      singleDate: null
    };
    public noOfPeople = 2;

    public guidesList: any[];
    public dealsList: Deals[];


    constructor(private calendar: NgbCalendar, 
        private router: Router,
        private apiService: ApiService,
        private toastr: ToastrService) 
    {
        this.createForm();
    }


    dateToFormat() : string {
      // "15-07-2020 - 17-07-2020"
      return this.today.getDate() + '-' + this.today.getMonth() +
       '-' + this.today.getFullYear() + ' - ' + this.afterFour.getDate() + '-' 
       + this.afterFour.getMonth() + '-' + this.afterFour.getFullYear()
    }


    createForm() {
        this.searchForm = new FormGroup({
          city: new FormControl('', [Validators.required]),
          startDate: new FormControl(),
          range: new FormControl(),
          endDate: new FormControl(),
          noOfPeople: new FormControl(4),
        })
      }

      getFilterData() {
        this.searchForm.patchValue({
            city: this.city,
            startDate: this.convertDateIntoString(this.range.dateRange.beginDate),
            endDate: this.convertDateIntoString(this.range.dateRange.endDate),
            noOfPeople: this.noOfPeople
          });
          console.log(this.searchForm.value);
          this.router.navigateByUrl('/tourists/touristshome/searchResult');
          this.getGuidesAndDealsList();
      }

      convertDateIntoString(date) : string {
        let strDate = '';
        strDate = date.year + '-' + date.month + '-' + date.day;
        return strDate;
      }

      getGuidesAndDealsList() {
        let url = '/tourist/guides';
        this.apiService.post(url, this.searchForm.value).subscribe( res => {
            console.log(res);
            this.guidesList = res.body.guides;
            this.dealsList = res.body.deals;
            console.log(this.guidesList);
        })
      }

      getGuideById(id) : Observable<any> {
        let url = '/tourist/guideDetails/' + id;
        return new Observable<any>(obs => {
            this.apiService.get(url).subscribe( res => {
                obs.next(res);
            })
        });
      }
    
}