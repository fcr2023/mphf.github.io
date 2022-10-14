import { Component } from '@angular/core';

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
