import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/validators/custom';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],

})
export class ChangePasswordComponent implements OnInit {

  public changePwd: FormGroup;
  @Output() outputPassword: EventEmitter<any> = new EventEmitter<any>();

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.changePwd = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required, CustomValidators.passwordConfirming])
    })
  }

  submitForm() {
    if(this.changePwd.valid) {
      if(this.changePwd.value.oldPassword === this.changePwd.value.newPassword) {
        this.toastr.error("Your Old and new password is same!")
      }else {
        this.outputPassword.emit(this.changePwd.value);
      }
    } else {
      this.toastr.error("Invalid Details!");
    }
  }

}
