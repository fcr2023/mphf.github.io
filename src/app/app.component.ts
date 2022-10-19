import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';


const firebaseConfig = {
  apiKey: "AIzaSyC3Ye6S8sLiegXQfrmZ5LM_MsIznIdlpnE",
  authDomain: "mphf-71891.firebaseapp.com",
  projectId: "mphf-71891",
  storageBucket: "mphf-71891.appspot.com",
  messagingSenderId: "1082240236500",
  appId: "1:1082240236500:web:44a5a603dc4d8626d0b441",
  measurementId: "G-TQ9F1TLXC1"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

@Component({
  selector: 'app-root-login',
  template: `
    <router-outlet></router-outlet>
    <app-messages></app-messages>
  `,
})

export class AppComponent {
  [x: string]: any;
}
