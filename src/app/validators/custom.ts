import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {

    static contactNumber(control: AbstractControl): ValidationErrors {
        var reg=/^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
        if(!control.value) {
            return null;
        }
        var isValid = control.value && reg.test(control.value.toString());
        const message = {
                'message': 'This field only accepts 10 or 13 digits numbers.'
        };
        return isValid ? null : message;
    }

    static pinCodeValidation(control: AbstractControl): ValidationErrors {
        var reg = /^[0-9-]{6,6}$/;
        if (!control.value) {
            return null;

        }
        var isValid = control.value && (reg.test(control.value.toString()));
        const message = {
                'message': 'This field only accepts 6 digits numbers.'
        };
        return isValid ? null : message;
    }

    static emailValidation(control: AbstractControl): ValidationErrors {
        var reg = /^.+@.+\..{2,5}$/;
        if (!control.value) {
            return null;
        }
        var isValid = control.value && reg.test(control.value.toString());
        const message = {
                'message': 'Please enter your email in this format: yourname@email.com'
        };
        return isValid ? null : message;
    }

    static compondValueValidate(control: AbstractControl): ValidationErrors {
        // const reg = /^[0-9]\d*(\.\d+)?$/;
        const reg = /^[0-9]\d*(\.\d+)?$/;
        if (!control.value) {
            return null;
        }
        const isValid = control.value && reg.test(control.value.toString());
        const message = {
            compondValueValidate: {
                message: 'This field only accepts numbers and this symbol:.'
            }
        };
        return isValid ? null : message;
    }

    static passwordConfirming(c: AbstractControl): any {
        if (!c.parent || !c) { return; }
        const pwd = c.parent.get('password');
        const cpwd = c.parent.get('confirmPassword');
        if (!pwd || !cpwd) { return; }
        if (pwd.value !== cpwd.value) {
          return { invalid: true };
        }
      }


}