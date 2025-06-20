import { Component } from '@angular/core';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { Nastavnik } from '../../../models/Nastavnik';
import { Silabus } from '../../../models/Silabus';
import { SilabusTerminService } from '../../../services/silabus-termin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NastavnikService } from '../../../services/nastavnik.service';
import { SilabusService } from '../../../services/silabus.service';

@Component({
  selector: 'app-silabus-termin-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './silabus-termin-forma.component.html',
  styleUrl: './silabus-termin-forma.component.css',
})
export class SilabusTerminFormaComponent {
  formaModel: FormaModel | null = null;
  idSilabusTermin: number | null = null;
  sviNastavnici: Nastavnik[] = [];
  sviSilabusi: Silabus[] = [];

  constructor(
    private silabusTerminService: SilabusTerminService,
    private router: Router,
    private route: ActivatedRoute,
    private nastavniciService: NastavnikService,
    private silabusService: SilabusService
  ) {}

  ngOnInit(): void {
    this.nastavniciService.getAll().subscribe((nastavnik) => {
      this.sviNastavnici = nastavnik;

      this.silabusService.getAll().subscribe((silabus) => {
        this.sviSilabusi = silabus;

        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
          this.idSilabusTermin = +idParam;
          this.silabusTerminService
            .getById(this.idSilabusTermin)
            .subscribe((termin) => {
              this.formaModel = this.kreirajModel(termin);
            });
        } else {
          this.formaModel = this.kreirajModel();
        }
      });
    });
  }



  otkazi(): void {
    this.router.navigate(['/SilabusTermin']);
  }

public sacuvajSilabusTermin(vrednosti: any): void {
  vrednosti.silabus = { id: vrednosti.silabus?.id ?? vrednosti.silabus?.['id'] };
  vrednosti.nastavnik = { id: vrednosti.nastavnik?.id ?? vrednosti.nastavnik?.['id'] };

  if (this.idSilabusTermin) {
    this.silabusTerminService.update(this.idSilabusTermin, vrednosti).subscribe({
      next: () => this.router.navigate(['/SilabusTermin']),
      error: err => console.error('Greška pri izmeni termina:', err)
    });
  } else {
    this.silabusTerminService.create(vrednosti).subscribe({
      next: () => this.router.navigate(['/SilabusTermin']),
      error: err => console.error('Greška pri čuvanju termina:', err)
    });
  }
}


 private kreirajModel(podaci?: any): FormaModel {

   let selektovaniNastavnik = podaci?.nastavnik ?? null
      let selektovaniSilabus = podaci?.silabus ?? null

  return {
    naziv: podaci ? 'Izmena termina' : 'Dodavanje termina',
    polja: [
      ...(podaci ? [{
        naziv: 'id',
        labela: '',
        tip: 'hidden',
        podrazumevanaVrednost: podaci.id
      }] : []),
      {
        naziv: 'datum',
        labela: 'datum',
        tip: 'date',
        podrazumevanaVrednost: podaci?.datum ?? '',
        validatori: [Validators.required]
      },
      {
        naziv: 'materijal',
        labela: 'materijal',
        tip: 'text',
        podrazumevanaVrednost: podaci?.materijal ?? '',
        validatori: [Validators.required]
      },
      {
        naziv: 'cilj',
        labela: 'cilj',
        tip: 'text',
        podrazumevanaVrednost: podaci?.cilj ?? '',
        validatori: [Validators.required]
      },
      {
        naziv: 'opis',
        labela: 'opis',
        tip: 'text',
        podrazumevanaVrednost: podaci?.opis ?? '',
        validatori: [Validators.required]
      },
      
      
      {
                naziv: 'nastavnik',
                labela: 'nastavnik',
                tip: 'select',
                podrazumevanaVrednost: selektovaniNastavnik,
                opcije: this.sviNastavnici,
                displayFn: (s: Nastavnik) =>
                  s.ime && s.prezime,
                validatori: [Validators.required]
              },
      {
                naziv: 'silabus',
                labela: 'silabus',
                tip: 'select',
                podrazumevanaVrednost: selektovaniSilabus,
                opcije: this.sviSilabusi,
                displayFn: (s: Silabus) =>
                  `${s.id}`,
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
