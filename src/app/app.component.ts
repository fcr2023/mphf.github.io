import { Component } from '@angular/core';
import { app } from './config/firebase-init';

app;

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
