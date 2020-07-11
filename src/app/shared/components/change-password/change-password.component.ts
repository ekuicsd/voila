import { Component, OnInit, Output, EventEmitter,ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None

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
      confirmPassword: new FormControl('', [Validators.required])
    })
  }

  submitForm() {
    if(this.changePwd.valid) {
      console.log(this.changePwd.value);
      this.outputPassword.emit(this.changePwd.value);
    } else {
      this.toastr.error("Invalid Details!");
    }
  }

}
