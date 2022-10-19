import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

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
  selector: 'login',
  templateUrl: './login-page-component.html',
  styleUrls: ['../app.component.css'],
})

export class AppLogin {
  matcher = new MyErrorStateMatcher();
  hide = true;
  hide2 = true;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', []);

  loginForm = this.formBuilder.group(
    {
      email: this.email,
      password: this.password
    }
  );

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  login(): void {
    const auth = getAuth();
    
    if (!this.loginForm?.valid) {
      return;
    }
    //destructuring
    const { email, password } = this.loginForm.value;

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          
          const user = userCredential.user;
          console.log(user);

          this.router.navigateByUrl('/filter');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  }
}
