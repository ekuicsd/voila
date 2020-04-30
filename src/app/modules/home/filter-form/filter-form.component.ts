import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { SearchService } from 'src/app/shared/service/search.service';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit {
 

  hoveredDate: NgbDate | null = null; //ngb

  constructor(private toastr: ToastrService,
    public searchService: SearchService,
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter
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

  ///////////////////////////////////////////////////////////////////
  onDateSelection(date: NgbDate) {
    if (!this.searchService.fromDate && !this.searchService.toDate) {
      this.searchService.fromDate = date;
    } else if (this.searchService.fromDate && !this.searchService.toDate && date && date.after(this.searchService.fromDate)) {
      this.searchService.toDate = date;
    } else {
      this.searchService.toDate = null;
      this.searchService.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.searchService.fromDate && !this.searchService.toDate && this.hoveredDate && date.after(this.searchService.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.searchService.toDate && date.after(this.searchService.fromDate) && date.before(this.searchService.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.searchService.fromDate) || (this.searchService.toDate && date.equals(this.searchService.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

}
