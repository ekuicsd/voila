import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StaticDataService } from 'src/app/shared/service/static-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Experience } from 'src/app/shared/models/guide.model';

@Component({
  selector: 'app-bussiness-details',
  templateUrl: './bussiness-details.component.html',
  styleUrls: ['./bussiness-details.component.scss']
})
export class BussinessDetailsComponent implements OnInit {
  @Output() basicData: EventEmitter<any> = new EventEmitter<any>();
  @Output() interestData: EventEmitter<any> = new EventEmitter<any>();
  @Output() languageData: EventEmitter<any> = new EventEmitter<any>();
  @Output() experienceData: EventEmitter<any> = new EventEmitter<any>();

  public interestList: string[];
  public userInterestList: string[] = [];
  public userLanguageList: string[] = [];
  public userLocationList: string[] = [];
  public userExperienceList: Experience[] = [];

  public interestForm: FormGroup;
  public languageForm: FormGroup;
  public locationForm: FormGroup;
  public experienceForm: FormGroup;
  public basicDetails: FormGroup;

  constructor(private staticDataService: StaticDataService, 
    private toastr: ToastrService) { }

  ngOnInit() {
    this.creatsBasicdetails();
    this.createInterestForm();
    this.createLanguageForm();
    this.createLocationForm();
    this.createExperienceForm();
    this.interestList = this.staticDataService.getAllInterestList();
    console.log(this.interestList);
  }

  creatsBasicdetails() {
    this.basicDetails = new FormGroup({
      peopleLimit: new FormControl('', [Validators.required]),
      perHeadCharge: new FormControl('', [Validators.required]),
      perDayCharge: new FormControl('', [Validators.required]),
    })
  }

  createInterestForm() {
    this.interestForm = new FormGroup({
      interest: new FormControl('', [Validators.required])
    })
  }

  createLanguageForm() {
    this.languageForm = new FormGroup({
      language: new FormControl('', [Validators.required])
    })
  }
  createLocationForm() {
    this.locationForm = new FormGroup({
      location: new FormControl('', [Validators.required])
    })
  }

  createExperienceForm() {
    this.experienceForm = new FormGroup({
      work: new FormControl('', [Validators.required]),
      startYear: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      profile: new FormControl('', [Validators.required])
    })
  }

  submitInterest() {
    if(this.interestForm.valid) {
      let index = this.userInterestList.indexOf(this.interestForm.value.interest);
      if(index == -1) {
        this.userInterestList.push(this.interestForm.value.interest);
        console.log(this.userInterestList);
        this.createInterestForm();
      } else {
        this.toastr.warning("Already added!");
      }
    } else {
      this.toastr.error("Invalid Details!");
    }
  }

  removeFromUserInterestList(item) {
    let index = this.userInterestList.indexOf(item);
    if(index !== -1) {
      this.userInterestList.splice(index, 1);
    }
  }

  submitLanguage() {
    if(this.languageForm.valid) {
      let index = this.userLanguageList.indexOf(this.languageForm.value.language);
      if(index == -1) {
        this.userLanguageList.push(this.languageForm.value.language);
        console.log(this.userLanguageList);
        this.createLanguageForm();
      } else {
        this.toastr.warning("Already added!");
      }
    } else {
      this.toastr.error("Invalid Details!");
    }
  }

  removeFromUserLanguageList(item) {
    let index = this.userLanguageList.indexOf(item);
    if(index !== -1) {
      this.userLanguageList.splice(index, 1);
    }
  }

  submitLocation() {
    if(this.locationForm.valid) {
      let index = this.userLocationList.indexOf(this.locationForm.value.location);
      if(index == -1) {
        this.userLocationList.push(this.locationForm.value.location);
        console.log(this.userLocationList);
        this.createLocationForm();
      } else {
        this.toastr.warning("Already added!");
      }
    } else {
      this.toastr.error("Invalid Details!");
    }
  }

  removeFromUserLocationList(item) {
    let index = this.userLocationList.indexOf(item);
    if(index !== -1) {
      this.userLocationList.splice(index, 1);
    }
  }


  submitExperienceForm() {
    if(this.experienceForm.valid) {
      this.userExperienceList.push(this.experienceForm.value);
      this.createExperienceForm();
    } else {
      this.toastr.error("Invalid details!");
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
    if(this.basicDetails.valid && this.userInterestList.length > 0 && this.userLanguageList.length > 0) {
      this.basicData.emit(this.basicDetails.value);
      this.interestData.emit(this.userInterestList);
      this.languageData.emit(this.userLanguageList);
      this.experienceData.emit(this.userExperienceList);
    } else {
      this.toastr.error("fill complete details!");
    }
  }

  
}
