import { Component, OnInit } from '@angular/core';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { Osoblje } from '../../../models/Osoblje';
import { StudentskaSluzba } from '../../../models/StudentskaSluzba';

import { OsobljeService } from '../../../services/osoblje.service';
import { StudentskaSluzbaService } from '../../../services/studentska-sluzba.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-osoblje-forma',
  standalone: true,
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './osoblje-forma.component.html',
  styleUrls: ['./osoblje-forma.component.css']
})
export class OsobljeFormaComponent implements OnInit {

  formaModel: FormaModel | null = null;
  idOsoblje: number | null = null;

  sveSluzbe: StudentskaSluzba[] = [];

  constructor(
    private osobljeService: OsobljeService,
    private studentskaSluzbaService: StudentskaSluzbaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.studentskaSluzbaService.getAll().subscribe(sluzbe => {
      this.sveSluzbe = sluzbe;

      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        this.idOsoblje = +idParam;
        this.osobljeService.getById(this.idOsoblje).subscribe(osoblje => {
          this.formaModel = this.kreirajModel(osoblje);
        });
      } else {
        this.formaModel = this.kreirajModel();
      }
    });
  }

  otkazi(): void {
    this.router.navigate(['/osoblje']);
  }

  sacuvajOsoblje(vrednosti: any): void {
    console.log('Čuvanje osoblja:', vrednosti);

    if (this.idOsoblje) {
      this.osobljeService.update(this.idOsoblje, vrednosti).subscribe({
        next: () => this.router.navigate(['/osoblje']),
        error: err => console.error('Greška prilikom ažuriranja:', err)
      });
    } else {
      this.osobljeService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/osoblje']),
        error: err => console.error('Greška prilikom kreiranja:', err)
      });
    }
  }

  private kreirajModel(podaci?: Osoblje): FormaModel {
    return {
      naziv: podaci ? 'Izmena osoblja' : 'Dodavanje osoblja',
      polja: [
        ...(podaci ? [{
          naziv: 'id',
          labela: '',
          tip: 'hidden',
          podrazumevanaVrednost: podaci.id
        }] : []),

        {
          naziv: 'vidljiv',
          labela: 'Vidljiv',
          tip: 'checkbox',
          podrazumevanaVrednost: podaci?.vidljiv ?? true
        },
        {
          naziv: 'ime',
          labela: 'Ime',
          tip: 'text',
          podrazumevanaVrednost: podaci?.ime ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'prezime',
          labela: 'Prezime',
          tip: 'text',
          podrazumevanaVrednost: podaci?.prezime ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'jmbg',
          labela: 'JMBG',
          tip: 'text',
          podrazumevanaVrednost: podaci?.jmbg ?? '',
          validatori: [Validators.required, Validators.pattern(/^\d{13}$/)]
        },
        {
          naziv: 'studentska_sluzba',
          labela: 'Studentska služba',
          tip: 'select',
          podrazumevanaVrednost: podaci?.studentska_sluzba ?? null,
          opcije: this.sveSluzbe,
          displayFn: (s: StudentskaSluzba) => s.naziv
        }
      ]
    };
  }

}
