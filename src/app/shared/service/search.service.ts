import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import {NgbDate, NgbCalendar, NgbDateParserFormatter, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    searchForm: FormGroup;
    fromDate: NgbDate | null;  //ngb
    toDate: NgbDate | null;  //ngb

    public guidesList: any[];
    public dealsList: any[];


    constructor(private calendar: NgbCalendar, 
        public formatter: NgbDateParserFormatter,
        private router: Router,
        private apiService: ApiService,
        private toastr: ToastrService) 
    {
        this.fromDate = calendar.getToday();
        this.toDate = calendar.getNext(calendar.getToday(), 'd', 4);
        this.createForm();
    }

    createForm() {
        this.searchForm = new FormGroup({
          city: new FormControl('', [Validators.required]),
          startDate: new FormControl(this.formatter.format(this.fromDate)),
          endDate: new FormControl(this.formatter.format(this.toDate)),
          noOfPeople: new FormControl(4),
        })
      }

      getFilterData() {
        this.searchForm.patchValue({
            startDate: this.formatter.format(this.fromDate),
            endDate: this.formatter.format(this.toDate)
          });
          console.log(this.searchForm.value);
          this.router.navigateByUrl('/tourists/touristshome/searchResult');
          this.getGuidesAndDealsList();
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