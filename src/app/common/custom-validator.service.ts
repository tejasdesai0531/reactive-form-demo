import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor() { }

  contactValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const validFormat = /^[0-9()+-]*$/.test(value);
      const validLength = value.length === 10;
      if (validFormat && validLength) {
        return null; // valid contact
      } else {
        return { invalidContact: { value } };
      }
    };
  }
}
