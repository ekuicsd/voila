import { Component, OnInit, ViewChild } from '@angular/core';
import { WizardComponent } from 'ng2-archwizard/dist';
import { ToastrService } from 'ngx-toastr';
import { GuideService } from 'src/app/shared/service/guide.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  @ViewChild('wizard', {static: false}) wizard: WizardComponent;
  guide: any = {};
  file: any;

  constructor(private toastr: ToastrService,
    private router: Router,
    private guideService: GuideService) { }

  ngOnInit() {
  }

  getProfileData(data) {
    this.file = data;
    this.wizard.navigation.goToNextStep();
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
        Swal.fire({
          title: 'Signup successfully!',
          text: "Your Application as a guide submiited and under review process. After Review you will be contacted by our employee for verification via call or email",
          confirmButtonColor: '#553d67',
          confirmButtonText: 'Ok'
        });
        this.router.navigateByUrl('/');
      } else {
        this.toastr.error(res.message);
        this.wizard.navigation.reset();
        this.wizard.navigation.canGoToStep(1);
      }
    });
  }
}
