import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {QuestionBase} from '../../models/questions/question-base';
@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class DynamicFormQuestionComponent {
  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;
  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  get isTouched() {
    return this.form.controls[this.question.key].touched;
  }

  get hasErrors() {
    return this.form.controls[this.question.key].errors != null;
  }

  get errorMessage() {
    const errors = this.form.controls[this.question.key].errors;

    let outPut = '';
    if (errors) {
      if (errors['required']) {
        outPut += `${this.question.label} is required.\n`;
      }
      if (errors['invalidDate']) {
        outPut += `Invalid date entered.\n`;
      }
      if (errors['forbiddenMinDate']) {
        outPut += `${this.question.label} must be after the minimum date.\n`;
      }
      if (errors['forbiddenMaxDate']) {
        outPut += `${this.question.label} must be before the maximum date.\n`;
      }
      if (errors['forbiddenMinValue']) {
        outPut += `${this.question.label} must have higher value than ${this.question.min}.\n`;
      }
      if (errors['forbiddenMaxValue']) {
        outPut += `${this.question.label} must have lower value than ${this.question.max}.\n`;
      }
    }
    return outPut;
  }

}