import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { getAuth, signOut } from 'firebase/auth';

export interface Symptom {
  name: string;
}

@Component({
  selector: 'view-presc-filter',
  templateUrl: './filter-page.component.html',
  // providers:  [ HeroService ]
  styleUrls: ['../app.component.css'],
})
export class AppPrescFilter implements OnInit {
  constructor(private location: Location, private router: Router) {}

  userName: string = '';
  provider: string = '';
  title = 'prescFilter';
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  symptoms: Symptom[] = [{ name: 'Headache' }];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our Symptom
    if (value) {
      this.symptoms.push({ name: value });
    }

    console.log(this.symptoms);

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(Symptom: Symptom): void {
    const index = this.symptoms.indexOf(Symptom);

    if (index >= 0) {
      this.symptoms.splice(index, 1);
    }
  }

  logout(): void {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // alert('Sign-out successful!');
        this.router.navigateByUrl('/login');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  ngOnInit(): void {
    //to do: get the list of tags
    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null) {
      user.providerData.forEach((profile) => {
        console.log(profile);

        if(profile.displayName) this.userName = profile.displayName;
        this.provider = profile.providerId;

        console.log('  Sign-in provider: ' + profile.providerId);
        console.log('  Provider-specific UID: ' + profile.uid);
        console.log('  Name: ' + profile.displayName);
        console.log('  Email: ' + profile.email);
        console.log('  Photo URL: ' + profile.photoURL);
      });
    }
  }

  search(): void {
    // this.location.back();
    console.log('::::::: going to database get the prescription');
  }
}
