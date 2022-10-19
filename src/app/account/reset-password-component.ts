import { Component, VERSION } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';
import { ErrorStateMatcher } from '@angular/material/core';
import { getAuth, updatePassword } from 'firebase/auth';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'reset-account',
  templateUrl: './reset-password-component.html',
  styleUrls: ['../app.component.css'],
})
export class AppResetAccount {
  name = 'Angular ' + VERSION.major;
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';

  hide = true;
  hide2 = true;

  matcher = new MyErrorStateMatcher();

//   email = new FormControl(null, []);

  newPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);

  confirmPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);

  registerForm = this.formBuilder.group(
    {
    //   email: this.email,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
    },
    {
      validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
    }
  );

  constructor(private formBuilder: FormBuilder, private location: Location) {}

  onSubmit(): void {
    console.log(this.registerForm);
    console.log(this.registerForm.value.newPassword);

    if (!this.registerForm?.valid) {
      return;
    }
    //destructuring
    // const { newPassword, confirmPassword } = this.registerForm.value;

    console.log('Updating password');
    // console.log(newPassword);
    // console.log(confirmPassword);

    const auth = getAuth();
    const user = auth.currentUser;
    console.log('Current User: ', user);
    
    // const newPassword = getASecureRandomPassword();

    // updatePassword(user, newPassword)
    //   .then(() => {
    //     // Update successful.
    //   })
    //   .catch((error) => {
    //     // An error ocurred
    //     // ...
    //   });
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  goBack(): void {
    this.location.back();
  }
}
