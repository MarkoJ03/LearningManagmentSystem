import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function forbiddenMinValueValidator(minValue: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null; 
          }
          const minNumber = Number(minValue);
          const inputNumber = Number(control.value);
          console.log("Lower than min: " ,inputNumber < minNumber);
          
      
          return inputNumber < minNumber ? { forbiddenMinValue: { value: control.value } } : null;
    };
  }