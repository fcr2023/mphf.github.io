import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';

export interface Symptom {
    name: string;
  }

@Component({
    selector:    'app-presc-filter',
    templateUrl: './filter-page.component.html',
    // providers:  [ HeroService ]
    styleUrls: ['./app.component.css']
  })
export class AppPrescFilter implements OnInit{
    title = 'prescFilter';
      addOnBlur = true;
      readonly separatorKeysCodes = [ENTER, COMMA] as const;
      symptoms: Symptom[] = [{name: 'Headache'}];
    
      add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
    
        // Add our Symptom
        if (value) {
          this.symptoms.push({name: value});
        }
    
        // Clear the input value
        event.chipInput!.clear();
      }
    
      remove(Symptom: Symptom): void {
        const index = this.symptoms.indexOf(Symptom);
    
        if (index >= 0) {
          this.symptoms.splice(index, 1);
        }
      }
      ngOnInit(): void {
        //to do: get the list of tags
        console.log('teste');
      }
    }