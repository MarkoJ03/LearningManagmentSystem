import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function forbiddenMaxValueValidator(maxValue: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null; 
          }
          const maxNumber = Number(maxValue);
          const inputNumber = Number(control.value);
          console.log("Vece od maksa ", maxNumber< inputNumber);
          
      
          return inputNumber > maxNumber ? { forbiddenMaxValue: { value: control.value } } : null;
    };
  }