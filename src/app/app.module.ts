import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MatChipsModule,
  MAT_CHIPS_DEFAULT_OPTIONS,
} from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { AppPrescFilter } from './filter/filter-page.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AppLogin } from './login/login-page-component';
import { AppNewAccount } from './account/new-account-component';
import { AppResetAccount } from './account/reset-password-component';
import { AppForgotPassword } from './login/forgot-pwd-component';
import { AppPrescription } from './prescription/prescription-component';

@NgModule({
  declarations: [
    AppComponent,
    AppPrescFilter,
    AppLogin,
    AppNewAccount,
    AppResetAccount,
    AppForgotPassword,
    AppPrescription,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatChipsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA],
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
