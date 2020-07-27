import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import * as moment from 'moment';
import { Filter } from '../models/filters.model';
import csc from 'country-state-city';
import { CustomValidators } from 'src/app/validators/custom';
@Injectable({
    providedIn: 'root'
})
export class SearchService {

    searchForm: FormGroup;
    public today = moment().toDate();
    public afterFour = moment().add(4, 'days').toDate();
    public state = 'Delhi';
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
    public extra_filter: Filter;
    public user;
    public stateList: any[];
    public cityList: any[];

    public guidesList: any[] = [];
    public dealsList: any[] = [];


    constructor(private calendar: NgbCalendar, 
        private router: Router,
        private apiService: ApiService,) 
    {
        this.createForm();
        this.getAllState('101');
        this.getAllCity('Delhi');
        this.extra_filter = {
          minPrice: 100,
          maxPrice: 2000,
          rating: null,
          interests: [],
          languages: [],
          city: []
        }
    }

    getAllState(countryId: string) {
      this.stateList = csc.getStatesOfCountry(countryId);
    }

    getAllCity(statename) {
      let stateId = this.stateList.filter(ele => {
        if(ele.name === statename) {
          return ele;
        }
      })[0].id;
      this.cityList = csc.getCitiesOfState(stateId);
      this.cityList = this.cityList.map(ele => ele.name);
    }


    dateToFormat() : string {
      return this.today.getDate() + '-' + this.today.getMonth() +
       '-' + this.today.getFullYear() + ' - ' + this.afterFour.getDate() + '-' 
       + this.afterFour.getMonth() + '-' + this.afterFour.getFullYear()
    }


    createForm() {
        this.searchForm = new FormGroup({
          state: new FormControl('Delhi', [Validators.required]),
          startDate: new FormControl([Validators.required]),
          range: new FormControl(),
          endDate: new FormControl([Validators.required]),
          noOfPeople: new FormControl(4, [Validators.required, CustomValidators.noOfPeopleValidation]),
          filter: new FormControl(true)
        });
      }

      getFilterData() {
        this.searchForm.patchValue({
            state: this.state,
            range: this.range,
            startDate: this.convertDateIntoString(this.range.dateRange.beginDate),
            endDate: this.convertDateIntoString(this.range.dateRange.endDate),
            noOfPeople: this.noOfPeople
          });
          this.router.navigateByUrl('/tourists/touristshome/searchResult');
          this.getGuidesAndDealsList();
      }

      convertDateIntoString(date) : string {
        let strDate = '';
        strDate = date.year + '-' + date.month + '-' + date.day;
        return strDate;
      }

      getGuidesAndDealsList() {
        let request = this.searchForm.value;
        request['extra_filter'] = this.extra_filter;
        let url = '/tourist/guides';
        this.apiService.post(url,request).subscribe( res => {
            this.guidesList = res.body.guides;
            this.dealsList = res.body.deals;
            if(this.guidesList.length <=0) {
              this.guidesList = undefined;
            } if(this.dealsList.length <=0) {
              this.dealsList = undefined;
            }
        })
      }

      getGuideById(id) : Observable<any> {
        let url = '/tourist/deals/guide/' + id;
        return new Observable<any>(obs => {
            this.apiService.get(url).subscribe( res => {
                obs.next(res);
            });
        });
      }
    
}