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
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { deleteUser, getAuth, updatePassword } from 'firebase/auth';
import { SHIFT } from '@angular/cdk/keycodes';

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
  selector: 'profile',
  templateUrl: './profile-component.html',
  styleUrls: ['../app.component.css'],
})

export class AppProfile{

  auth = getAuth();

  name = 'Angular ' + VERSION.major;
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';

  hide = true;
  hide2 = true;

  matcher = new MyErrorStateMatcher();

  email = new FormControl({value: this.auth.currentUser?.email, disabled: true}, []);
  
  profileName = new FormControl({value: this.auth.currentUser?.displayName, disabled:true}, []);

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
      profileName: this.profileName,
      email: this.email,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
    },
    {
      validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router
    ) {}

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

  deleteProfile(): void {
    const user = this.auth.currentUser;

    if (!user) {
      return;
    }

    deleteUser(user)
      .then(() => {
        // User deleted.
        alert("Password successfully Deleted");
        this.router.navigateByUrl('/login');
      })
      .catch((error) => {
        const msg: string = error.code;
        alert(msg.substring(5));
      });
    }
    redefinePwd(): void {
     
      
      const user = this.auth.currentUser;
      if (!user) {
        return;
      }
      const { newPassword } = this.registerForm.value;
      
      updatePassword(user, newPassword)
      .then(() => {
        alert("Password successfully updated");
        this.router.navigateByUrl('/login');
      })
      .catch((error) => {
        const msg: string = error.code;
        alert(msg.substring(5));
      });
  }

  goBack(): void {
    this.location.back();
  }
}
