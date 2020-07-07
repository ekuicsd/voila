import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from 'src/app/shared/service/search.service';
import {IAngularMyDpOptions } from 'angular-mydatepicker';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit {
  
  public today = new Date();
  public myOptions: IAngularMyDpOptions = {
    dateRange: true,
    dateFormat: 'dd-mm-yyyy',
    calendarAnimation: {in: 2, out: 3},
    disableUntil: {
      day: this.today.getDate() - 1,
      month: this.today.getMonth() + 1,
      year: this.today.getFullYear()
    }
  }

  constructor(private toastr: ToastrService,
    public searchService: SearchService,
    ) { 
    }

  ngOnInit() {
  }

  submitForm() {
    if(this.searchService.searchForm.valid) {
      this.searchService.getFilterData();
    } else {
      this.toastr.warning("Please enter city!");
    }
  }

  changeRange(event) {
    console.log(event);
  }

}
