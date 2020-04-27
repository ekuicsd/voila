import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {

  @Output() tc: EventEmitter<any> = new EventEmitter<any>();
  public termsConditions: FormGroup = new FormGroup({
    tc: new FormControl('', [Validators.required])
  });

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
  }

  submitTc() {
    if(this.termsConditions.valid) {
      this.tc.emit();
    } else {
      this.toastr.error("Please accept terms and conditions!");
    }
  }

}
