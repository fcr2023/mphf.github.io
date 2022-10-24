import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import {
  getAuth,
  signInWithEmailAndPassword,
  linkWithRedirect,
  GoogleAuthProvider,
  linkWithPopup,
  unlink,
  getRedirectResult,
  EmailAuthProvider,
  signOut,
  signInWithPopup,
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
  auth = getAuth();
  // auth.languageCode = 'it';

  googleProvider = new GoogleAuthProvider();

  matcher = new MyErrorStateMatcher();
  msgError: string = '';
  hide = true;
  hide2 = true;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', []);

  loginForm = this.formBuilder.group({
    email: this.email,
    password: this.password,
  });

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  login(): void {
    if (!this.loginForm?.valid) {
      return;
    }
    //destructuring
    const { email, password } = this.loginForm.value;

    if (email && password) {
      signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          // Signed in

          const user = userCredential.user;

          this.router.navigateByUrl('/filter');
        })
        .catch((error) => {
          this.msgError = error.code;
          alert(this.msgError.substring(5));
        });
    }
  }

  googleAuth(): void {    
    console.log('Current user === ', this.auth.currentUser);
    console.log('Gogle Provider = ', this.googleProvider);
    console.log('provider ID ==== ', this.googleProvider.providerId);

    // if(this.auth.currentUser) {
    //   signOut(this.auth).then(() => {
    //   }).catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });
    // }
    this.signWithGoogle();
  }

  signWithGoogle(): void {

    signInWithPopup(this.auth, this.googleProvider)
      .then((result) => {
        // Accounts successfully linked.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        this.router.navigateByUrl('/filter');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        this.msgError = error.code;
        alert(this.msgError.substring(5));
        // if (this.msgError === 'credential-already-in-use') {
        //   const credential = EmailAuthProvider.credential(
        //     this.auth.currentUser.email,
        //     'Fred@1234'
        //   );
        // }
      });
  }
}
