import { Component } from '@angular/core';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
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
  selector: 'reset-pwd',
  templateUrl: './forgot-pwd-component.html',
  styleUrls: ['../app.component.css'],
})
export class AppForgotPassword {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router) {};

  sendEmail(): void {
    
    const email  = this.emailFormControl.value;
    
    if(!email) return
    console.log(email);

    const auth = getAuth();
    // auth.languageCode = 'it';

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('An E-mail password reset was sent! Make sure that was not in your trash.')
        this.router.navigateByUrl('/login');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
}
