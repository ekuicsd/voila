import { Component, OnInit, ViewChild , ViewEncapsulation} from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Guide } from 'src/app/shared/models/guide.model';
import { WizardComponent } from 'ng2-archwizard/dist';
import { ToastrService } from 'ngx-toastr';
import { GuideService } from 'src/app/shared/service/guide.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  // guideForm: FormGroup;
  @ViewChild('wizard', {static: false}) wizard: WizardComponent;
  guide: Guide = {};

  constructor(private toastr: ToastrService, private guideService: GuideService) { }

  ngOnInit() {


  }

  // createForm() {
  //   this.guideForm = new FormGroup({
  //     name : new FormControl('', [Validators.required]),
  //     gender : new FormControl('', [Validators.required]),
  //     password : new FormControl('', [Validators.required]),
  //     dob : new FormControl('', [Validators.required]),
  //     phoneNumber : new FormControl('', [Validators.required]),
  //     email : new FormControl('', [Validators.required]),
  //     address : new FormControl('', [Validators.required]),
  //     experience : new FormControl('', [Validators.required]),
  //     peopleLimit : new FormControl('', [Validators.required]),
  //     perHeadCharge : new FormControl('', [Validators.required]),
  //     perDayCharge : new FormControl('', [Validators.required]),
  //     // picUrl : picUrl,
  //     aadhaarNumber : new FormControl('', [Validators.required]),
  //     interests : new FormControl('', [Validators.required]),
  //     languages : new FormControl('', [Validators.required]),
  //     city : new FormControl('', [Validators.required]),
  //     state : new FormControl('', [Validators.required])
  //   })
  // }

  getPersonalData(data) {
    // this.guideForm.patchValue(data);
    this.guide = data;
    console.log(this.guide);
    this.wizard.navigation.goToNextStep();
  }

  getBasicData(data) {
    this.guide.peopleLimit = data.peopleLimit;
    this.guide.perDayCharge = data.perDayCharge;
    this.guide.perHeadCharge = data.perHeadCharge;
  }

  getLanguageData(data) {
    this.guide.languages = data;
  }

  getInterestData(data) {
    this.guide.interests = data;
  }

  getExperienceData(data) {
    this.guide.experience = data;
    this.wizard.navigation.goToNextStep();
  }

  finalSubmit() {
    console.log("done!");
    console.log(this.guide);

    const formData = new FormData();
    formData.append("data", JSON.stringify(this.guide));

    this.guideService.guideSignup(formData).subscribe( res => {
      console.log(res);
      this.toastr.success("Created Successfully!");
      this.wizard.navigation.reset();
    })
  }
}
