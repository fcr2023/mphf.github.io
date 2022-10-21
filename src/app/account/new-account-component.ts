import { Component, OnInit, VERSION } from '@angular/core';
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
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { Router } from '@angular/router';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { user } from '@angular/fire/auth';

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

export interface UserProfile {
  dependents: string;
  dob: string;
  fullname: string;
  since: any;
  uid: string;
  zipcode: string;
}

@Component({
  selector: 'new-account',
  templateUrl: './new-account-component.html',
  styleUrls: ['../app.component.css'],
})
export class AppNewAccount implements OnInit{
  name = 'Angular ' + VERSION.major;
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';

  hide = true;
  hide2 = true;

  matcher = new MyErrorStateMatcher();

  
  email = new FormControl(null, []);
  profileName = new FormControl(null, []);

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

  insertUserDb(): void {
    console.log('estou aqui papai');

    try {
      async (db: any) => {
        const docRef = await addDoc(collection(db, 'usuarios'), {
          dependents: 'ID here',
          dob: '12/23/1981',
          fullname: 'Fredson Ribeiro',
          since: new Date().getTime,
          uid: '1234',
          zipcode: '27707',
        });
        console.log('Document written with ID: ', docRef.id);
      };
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  onSubmit(): void {

    if (!this.registerForm?.valid) {
      return;
    }
    //destructuring
    const { profileName, email, newPassword } = this.registerForm.value;

    console.log('Creating new user');
    console.log(email);
    console.log(newPassword);

    // Get a list of users from your database
    const db = getFirestore();

    this.insertUserDb();

    async function addUser(db: any) {
      const usersCol = collection(db, 'usuarios');
      const today = new Date().toLocaleDateString;
      console.log(today);
      
      const UsersSnapshot = await addDoc(usersCol, {
        dependents: 'Carlos bolsonaro',
        dob: '01/01/1957',
        fullname: 'Bolsonaro',
        since: '10/17/2022',
        uid: 'wIHOGs6h1UeKGibuZom3RnYApBr2',
        zipcode: '27707',
      });

      alert('insert successfull');
    }
    async function getUsers(db: any) {
      const usersCol = collection(db, 'usuarios');
      const UsersSnapshot = await getDocs(usersCol);
      const usersList = UsersSnapshot.docs.map((doc) => doc.data());

      return usersList;
    }

    const ins = addUser(db);
    const users = getUsers(db);
    console.log('Users List = ', users);

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, newPassword)
      .then((userCredential) => {
        console.log(userCredential);

        // Signed in
        const user = userCredential.user;
        console.log('User datas: ', user);

        if (user) {
          alert('User success created!');
          updateProfile(user, {
            displayName: profileName,
          })
            .then(() => {
              // Profile updated!
              this.router.navigateByUrl('/login');
            })
            .catch((error) => {
              // An error occurred
              const msg: string = error.code;
              alert(msg.substring(5));
            });
        }
      })
      .catch((error) => {
        const msg: string = error.code;
        alert(msg.substring(5));
      });
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
  ngOnInit(): void {
    console.log('tem registro aqui ', this.registerForm);
    
    // this.registerForm.reset();
  }
}
