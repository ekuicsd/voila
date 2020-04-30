import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import {NgbDate, NgbCalendar, NgbDateParserFormatter, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    searchForm: FormGroup;
    fromDate: NgbDate | null;  //ngb
    toDate: NgbDate | null;  //ngb


    constructor(private calendar: NgbCalendar, 
        public formatter: NgbDateParserFormatter,
        private router: Router,
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
      }
    
}