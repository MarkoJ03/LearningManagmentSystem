import { Component, EventEmitter, Input, input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormaModel } from './FormaModel';


@Component({
  selector: 'app-genericka-forma',
  imports: [ReactiveFormsModule],
  templateUrl: './genericka-forma.component.html',
  styleUrl: './genericka-forma.component.css'
})
export class GenerickaFormaComponent implements OnChanges {

  constructor(private router: Router) {}

@Input()
formaModel: FormaModel | null= null;

@Output()
submitEvent: EventEmitter<any> = new EventEmitter();

@Output() cancelEvent = new EventEmitter<void>();

forma: FormGroup = new FormGroup({});
  
public kreirajFormu(){
let grupa: any = {};
 
if(this.formaModel){
  for(let p of this.formaModel?.polja){
    grupa[p.naziv] = new FormControl(p.podrazumevanaVrednost, p.validatori)
  }
}

this.forma = new FormGroup(grupa);

}

ngOnChanges(changes: SimpleChanges): void {
  this.kreirajFormu();
}

onSubmit(){
  if (this.forma.valid){
  this.submitEvent.emit(this.forma.value);
  }
}

compareFn = (a: any, b: any): boolean => {
  if (a && b && a.id && b.id) {
    return a.id === b.id;
  }
  return a === b;
};



onCancel(): void {
  this.cancelEvent.emit();
}

}
