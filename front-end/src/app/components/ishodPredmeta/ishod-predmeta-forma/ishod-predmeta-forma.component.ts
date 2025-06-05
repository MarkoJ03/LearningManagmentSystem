import { Component, OnInit } from '@angular/core';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { IshodPredmeta } from '../../../models/IshodPredmeta';
import { RealizacijaPredmeta } from '../../../models/RealizacijaPredmeta';
import { IshodEvaluacije } from '../../../models/IshodEvaluacije';

import { IshodPredmetaService } from '../../../services/ishod-predmeta.service';
import { RealizacijaPredmetaService } from '../../../services/realizacija-predmeta.service';
import { IshodEvaluacijeService } from '../../../services/ishod-evaluacije.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ishod-predmeta-forma',
  standalone: true,
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './ishod-predmeta-forma.component.html',
  styleUrls: ['./ishod-predmeta-forma.component.css']
})
export class IshodPredmetaFormaComponent implements OnInit {

  formaModel: FormaModel | null = null;
  idIshodPredmeta: number | null = null;

  sviRealizacijePredmeta: RealizacijaPredmeta[] = [];
  sviIshodiEvaluacije: IshodEvaluacije[] = [];

  constructor(
    private ishodPredmetaService: IshodPredmetaService,
    private realizacijaPredmetaService: RealizacijaPredmetaService,
    private ishodEvaluacijeService: IshodEvaluacijeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.realizacijaPredmetaService.getAll().subscribe(realizacije => {
      this.sviRealizacijePredmeta = realizacije;

      this.ishodEvaluacijeService.getAll().subscribe(ishodi => {
        this.sviIshodiEvaluacije = ishodi;

        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
          this.idIshodPredmeta = +idParam;
          this.ishodPredmetaService.getById(this.idIshodPredmeta).subscribe(ishodPredmeta => {
            this.formaModel = this.kreirajModel(ishodPredmeta);
          });
        } else {
          this.formaModel = this.kreirajModel();
        }
      });
    });
  }

  otkazi(): void {
    this.router.navigate(['/ishod-predmeta']);
  }

  sacuvaj(vrednosti: any): void {
    console.log('Čuvanje ishoda predmeta:', vrednosti);

    if (this.idIshodPredmeta) {
      this.ishodPredmetaService.update(this.idIshodPredmeta, vrednosti).subscribe({
        next: () => this.router.navigate(['/ishod-predmeta']),
        error: err => console.error('Greška prilikom ažuriranja:', err)
      });
    } else {
      this.ishodPredmetaService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/ishod-predmeta']),
        error: err => console.error('Greška prilikom kreiranja:', err)
      });
    }
  }

 private kreirajModel(podaci?: IshodPredmeta): FormaModel {
  return {
    naziv: podaci ? 'Izmena ishoda predmeta' : 'Dodavanje ishoda predmeta',
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
        naziv: 'ocena',
        labela: 'Ocena',
        tip: 'number',
        podrazumevanaVrednost: podaci?.ocena ?? null,
        validatori: [Validators.required, Validators.min(1), Validators.max(10)]
      },
      {
        naziv: 'realizacijePredmeta',
        labela: 'Realizacije predmeta',
        tip: 'checkbox-list',
        podrazumevanaVrednost: podaci?.realizacijePredmeta || [],
        opcije: this.sviRealizacijePredmeta,
        displayFn: (r: RealizacijaPredmeta) => `ID: ${r.id}`
      },
      {
        naziv: 'ishodiEvaluacije',
        labela: 'Ishodi evaluacije',
        tip: 'checkbox-list',
        podrazumevanaVrednost: podaci?.ishodiEvaluacije || [],
        opcije: this.sviIshodiEvaluacije,
        displayFn: (i: IshodEvaluacije) => i.napomena || `ID: ${i.id}`
      }
    ]
  };
}


}
