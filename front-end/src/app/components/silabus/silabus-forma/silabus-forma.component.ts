import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Grad } from '../../../models/Grad';
import { DrzavaService } from '../../../services/drzava.service';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { SilabusTermin } from '../../../models/SilabusTermin';
import { SilabusService } from '../../../services/silabus.service';
import { SilabusTerminService } from '../../../services/silabus-termin.service';

@Component({
  selector: 'app-silabus-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './silabus-forma.component.html',
  styleUrl: './silabus-forma.component.css'
})
export class SilabusFormaComponent {



  formaModel: FormaModel | null = null;
    idSilabus: number | null = null;
    sviTermini: SilabusTermin[] = [];
    



  constructor(
    private silabusService: SilabusService,
    private router: Router,
    private route: ActivatedRoute,
    private terminService: SilabusTerminService
  ) {}


ngOnInit(): void {

this.terminService.getAll().subscribe(termin => {
      this.sviTermini = termin;


 const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idSilabus = +idParam;
      this.silabusService.getById(this.idSilabus).subscribe(silabus => {
        this.formaModel = this.kreirajModel(silabus);
      });
    } else {
      this.formaModel = this.kreirajModel();
    }


      
})
}

  otkazi(): void {
    this.router.navigate(['/Silabus']);
  }


  
public sacuvajSilabus(vrednosti: any): void {



    if (this.idSilabus) {
      this.silabusService.update(this.idSilabus, vrednosti).subscribe({
        next: () => this.router.navigate(['/Silabus']),
        error: err => console.error('Greška pri izmeni adrese:', err)
      });
    } else {
      this.silabusService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/Silabus']),
        error: err => console.error('Greška pri čuvanju adrese:', err)
      });
    }
  }

   private kreirajModel(podaci?: any): FormaModel {

   let selektovaniTermini = podaci?.termini ?? null
  return {
    naziv: podaci ? 'Izmena silabusa' : 'Dodavanje silabusa',
    polja: [
      ...(podaci ? [{
        naziv: 'id',
        labela: '',
        tip: 'hidden',
        podrazumevanaVrednost: podaci.id
      }] : []),
     
      
      {
                naziv: 'termini',
                labela: 'termini',
                tip: 'checkbox-list',
                podrazumevanaVrednost: selektovaniTermini,
                opcije: this.sviTermini,
                displayFn: (s: SilabusTermin) =>
                  s.opis,
                validatori: [Validators.required]
              },
      
      {
        naziv: 'vidljiv',
        labela: 'Vidljiv',
        tip: 'checkbox',
        podrazumevanaVrednost: podaci?.vidljiv ?? true,
        validatori: []
      }
    ]
  };
}

}
