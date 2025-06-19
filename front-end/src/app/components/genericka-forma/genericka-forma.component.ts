import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormaModel } from './FormaModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genericka-forma',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './genericka-forma.component.html',
  styleUrls: ['./genericka-forma.component.css']
})
export class GenerickaFormaComponent implements OnChanges {

  @Input()
  formaModel: FormaModel | null = null;

  @Output()
  submitEvent: EventEmitter<any> = new EventEmitter();

  @Output()
  cancelEvent = new EventEmitter<void>();

  forma: FormGroup = new FormGroup({});

  ngOnChanges(changes: SimpleChanges): void {
    this.kreirajFormu();
  }

  kreirajFormu(): void {
    let grupa: any = {};

    if (this.formaModel) {
      for (let p of this.formaModel.polja) {
        if (p.tip === 'checkbox-list') {
          grupa[p.naziv] = new FormControl(p.podrazumevanaVrednost || []);
        } else {
          grupa[p.naziv] = new FormControl(p.podrazumevanaVrednost, p.validatori);
        }
      }
    }

    this.forma = new FormGroup(grupa);
  }

  onSubmit(): void {
    if (this.forma.valid) {
      this.submitEvent.emit(this.forma.value);
      console.log('Vrednosti forme:', this.forma.value);
    }
  }

  onCancel(): void {
    this.cancelEvent.emit();
  }

  onCheckboxChange(poljeNaziv: string, event: any, opcija: any): void {
    const kontrola = this.forma.get(poljeNaziv);
    let trenutne = [...(kontrola?.value || [])];

    if (event.target.checked) {
      if (!trenutne.some((o: any) => this.compareFn(o, opcija))) {
        trenutne.push(opcija);
      }
    } else {
      trenutne = trenutne.filter((o: any) => !this.compareFn(o, opcija));
    }

    kontrola?.setValue(trenutne);
    kontrola?.markAsDirty();
  }

  jeOpcijaSelektovana(naziv: string, opcija: any): boolean {
    const vrednosti = this.forma.get(naziv)?.value || [];
    return vrednosti.some((o: any) => this.compareFn(o, opcija));
  }

  compareFn = (a: any, b: any): boolean => {
    if (a && b && a.id && b.id) {
      return a.id === b.id;
    }
    return a === b;
  };
}
