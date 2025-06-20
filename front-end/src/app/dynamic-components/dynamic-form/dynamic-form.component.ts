import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {DynamicFormQuestionComponent} from '../dynamic-form-question/dynamic-form-question.component';
import {QuestionBase} from '../../models/questions/question-base';
import {QuestionControlService} from '../../service/question-control/question-control.service';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService],
  imports: [CommonModule, DynamicFormQuestionComponent, ReactiveFormsModule],
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] | null = [];

  form!: FormGroup;
  @Input()
  model:any = {};

  @Output()
  submitEvent = new EventEmitter<any>();

  constructor(private qcs: QuestionControlService) {}
  ngOnInit() {
    this.buildForm();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes['model'] && !changes['model'].firstChange) {
      this.buildForm();
    }
  }

  buildForm(){
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[], this.model);
  }

  onSubmit() {
    this.submitEvent.emit(this.form.getRawValue());
  }
}