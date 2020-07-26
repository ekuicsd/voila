import { Component, OnInit, ViewChild } from '@angular/core';
import { Guide } from 'src/app/shared/models/guide.model';
import { WizardComponent } from 'ng2-archwizard/dist';
import { ToastrService } from 'ngx-toastr';
import { GuideService } from 'src/app/shared/service/guide.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  @ViewChild('wizard', {static: false}) wizard: WizardComponent;
  guide: Guide = {};
  file: any;

  constructor(private toastr: ToastrService,
    private router: Router,
    private guideService: GuideService) { }

  ngOnInit() {
  }

  getProfileData(data) {
    this.file = data;
  }

  getPersonalData(data) {
    this.guide = data;
    this.wizard.navigation.goToNextStep();
  }

  getBasicData(data) {
    this.guide.peopleLimit = data.peopleLimit;
    this.guide.perDayCharge = data.perDayCharge;
    this.guide.perHeadCharge = data.perHeadCharge;
  }

  getLanguageData(data) {
    this.guide.languages = data;
    this.wizard.navigation.goToNextStep();
  }

  getInterestData(data) {
    this.guide.interests = data;
    this.wizard.navigation.goToNextStep();
  }

  getExperienceData(data) {
    this.guide.experience = data;
    this.wizard.navigation.goToNextStep();
  }

  // terms and conditions 
  finalSubmit() {
    const formData = new FormData();
    formData.append("data", JSON.stringify(this.guide));
    for (var i = 0; i < this.file.length; i++) { 
      formData.append("profilePic", this.file[i]);
    }
    this.guideService.guideSignup(formData).subscribe( res => {
      if(res.success) {
        this.toastr.success("Created Successfully!");
        this.router.navigateByUrl('/login/guide');
      } else {
        this.toastr.error(res.message);
        this.wizard.navigation.reset();
        this.wizard.navigation.canGoToStep(1);
      }
    });
  }
}
