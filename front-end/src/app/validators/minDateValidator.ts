import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function forbiddenMinDateValidator(dateStr: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null; 
          }
          
          const inputDate = new Date(control.value);
          const minDate = new Date(dateStr);
          
          if (isNaN(inputDate.getTime())) {
            return { invalidDate: { value: control.value } }; 
          }
      
          return inputDate < minDate ? { forbiddenMinDate: { value: control.value } } : null;
    };
  }