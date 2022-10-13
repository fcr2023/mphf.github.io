import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatChipsModule, MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material/chips'; 
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { AppPrescFilter } from './filter-page.componet';



@NgModule({
  declarations: [
    AppComponent,
    AppPrescFilter
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
    FormsModule
  ],
  providers: [
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA]
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
