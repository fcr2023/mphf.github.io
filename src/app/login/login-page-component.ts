import { Component } from '@angular/core'
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }
  @Component({
    selector: 'login',
    templateUrl: './login-page-component.html',
    styleUrls: ['../app.component.css']
  })
  
  export class AppLogin {
    
    matcher = new MyErrorStateMatcher();
    
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    pwd: string = '';
    email: string = '';

  login(): void {
    console.log(this.email);
    console.log(this.pwd);
      
    const auth = getAuth();
      
      signInWithEmailAndPassword(auth, this.email, this.pwd)
        .then((userCredential) => {
          // Signed in
          console.log('cheguei aqui');
          
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
}