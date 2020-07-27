import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/validators/custom';

@Component({
  selector: 'app-bussiness-details',
  templateUrl: './bussiness-details.component.html',
  styleUrls: ['./bussiness-details.component.scss']
})
export class BussinessDetailsComponent implements OnInit {
  @Output() basicData: EventEmitter<any> = new EventEmitter<any>();
  @Output() experienceData: EventEmitter<any> = new EventEmitter<any>();

  public userExperienceList: any[] = [];

  public experienceForm: FormGroup;
  public basicDetails: FormGroup;

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.creatsBasicdetails();
    this.createExperienceForm();
  }

  creatsBasicdetails() {
    this.basicDetails = new FormGroup({
      peopleLimit: new FormControl('', [Validators.required, CustomValidators.compondValueValidate]),
      perHeadCharge: new FormControl('', [Validators.required, CustomValidators.compondValueValidate]),
      perDayCharge: new FormControl('', [Validators.required, CustomValidators.compondValueValidate]),
    })
  }

  createExperienceForm() {
    this.experienceForm = new FormGroup({
      work: new FormControl('', [Validators.required]),
      startYear: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), CustomValidators.compondValueValidate]),
      duration: new FormControl('', [Validators.required, CustomValidators.compondValueValidate]),
      profile: new FormControl('', [Validators.required])
    })
  }


  submitExperienceForm() {
    if(this.experienceForm.valid) {
      this.userExperienceList.push(this.experienceForm.value);
      this.createExperienceForm();
    } else {
      this.toastr.error("Please fill experience details!");
    }
  }

  editExperience(item) {
    let index = this.userExperienceList.indexOf(item);
    this.experienceForm.patchValue(item);
    if(index !== -1) {
      this.userExperienceList.splice(index, 1);
    }
  }

  removeExperience(item) {
    let index = this.userExperienceList.indexOf(item);
    if(index !== -1) {
      this.userExperienceList.splice(index, 1);
    }
  }

  finalSubmit() {
    if(this.basicDetails.valid) {
      this.basicData.emit(this.basicDetails.value);
      this.experienceData.emit(this.userExperienceList);
    } else {
      this.toastr.error("fill complete details!");
    }
  }

  
}
