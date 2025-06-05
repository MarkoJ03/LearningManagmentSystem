import { Component, OnInit } from '@angular/core';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { Objava } from '../../../models/Objava';
import { StudentskaSluzba } from '../../../models/StudentskaSluzba';

import { ObjavaService } from '../../../services/objava.service';
import { StudentskaSluzbaService } from '../../../services/studentska-sluzba.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-objava-forma',
  standalone: true,
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './objava-forma.component.html',
  styleUrls: ['./objava-forma.component.css']
})
export class ObjavaFormaComponent implements OnInit {

  formaModel: FormaModel | null = null;
  idObjava: number | null = null;

  sveStudentskeSluzbe: StudentskaSluzba[] = [];

  constructor(
    private objavaService: ObjavaService,
    private studentskaSluzbaService: StudentskaSluzbaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.studentskaSluzbaService.getAll().subscribe(sluzbe => {
      this.sveStudentskeSluzbe = sluzbe;

      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        this.idObjava = +idParam;
        this.objavaService.getById(this.idObjava).subscribe(objava => {
          this.formaModel = this.kreirajModel(objava);
        });
      } else {
        this.formaModel = this.kreirajModel();
      }
    });
  }

  otkazi(): void {
    this.router.navigate(['/objave']);
  }

  sacuvaj(vrednosti: any): void {
    console.log('Čuvanje objave:', vrednosti);

    if (this.idObjava) {
      this.objavaService.update(this.idObjava, vrednosti).subscribe({
        next: () => this.router.navigate(['/objave']),
        error: err => console.error('Greška prilikom ažuriranja:', err)
      });
    } else {
      this.objavaService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/objave']),
        error: err => console.error('Greška prilikom kreiranja:', err)
      });
    }
  }

  private kreirajModel(podaci?: Objava): FormaModel {
    return {
      naziv: podaci ? 'Izmena objave' : 'Dodavanje objave',
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
          naziv: 'naslov',
          labela: 'Naslov',
          tip: 'text',
          podrazumevanaVrednost: podaci?.naslov ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'sadrzaj',
          labela: 'Sadržaj',
          tip: 'textarea',
          podrazumevanaVrednost: podaci?.sadrzaj ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'studentska_sluzba',
          labela: 'Studentska služba',
          tip: 'select',
          podrazumevanaVrednost: podaci?.studentska_sluzba ?? null,
          opcije: this.sveStudentskeSluzbe,
          displayFn: (s: StudentskaSluzba) => `${s.id}`
        }
      ]
    };
  }

}
