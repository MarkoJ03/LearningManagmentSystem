import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from '../../models/questions/question-base';
import { forbiddenMinDateValidator } from '../../validators/minDateValidator';
import { forbiddenMaxDateValidator } from '../../validators/maxDateValidator';
import { forbiddenMinValueValidator } from '../../validators/minValueValidator';
import { forbiddenMaxValueValidator } from '../../validators/maxValueValidator';

@Injectable()
export class QuestionControlService {
  toFormGroup(questions: QuestionBase<string>[], model: any = {}): FormGroup {
    const group: any = {};
    questions.forEach((question) => { 
      const validators = question.required ? [Validators.required] : [];

      if (question.type === 'date') {
        if (question.min) validators.push(forbiddenMinDateValidator(question.min));
        if (question.max) validators.push(forbiddenMaxDateValidator(question.max));
      } else {
        if (question.min) validators.push(forbiddenMinValueValidator(question.min));
        if (question.max) validators.push(forbiddenMaxValueValidator(question.max));
      }

      group[question.key] = new FormControl(model[question.key] || '', validators);
    });
    return new FormGroup(group);
  }
}
