import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerickaFormaComponent } from '../../../genericka-forma/genericka-forma.component';
import { FormaModel } from '../../../genericka-forma/FormaModel';
import { StudentNaGodini } from '../../../../models/StudentNaGodini';
import { EvaluacijaZnanja } from '../../../../models/EvaluacijaZnanja';
import { IshodPredmeta } from '../../../../models/IshodPredmeta';
import { IshodEvaluacijeService } from '../../../../services/ishod-evaluacije.service';
import { StudentNaGodiniService } from '../../../../services/student-na-godini.service';
import { EvaluacijaZnanjaService } from '../../../../services/evaluacija-znanja.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IshodPredmetaService } from '../../../../services/ishod-predmeta.service';
import { IshodEvaluacije } from '../../../../models/IshodEvaluacije';

@Component({
  selector: 'app-ishod-evaluacije-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './ishod-evaluacije-forma.component.html',
  styleUrl: './ishod-evaluacije-forma.component.css'
})
export class IshodEvaluacijeFormaComponent {
  formaModel: FormaModel | null = null;
  idIshodaEvaluacije: number | null = null;
  sviStudentiNaGodini: StudentNaGodini[] = [];
  sveEvaluacijeZnanja: EvaluacijaZnanja[] = [];
  sviIshodiPredmeta: IshodPredmeta[] = [];

  constructor(
    private ishodEvaluacijeService: IshodEvaluacijeService,
    private studentNaGodiniService: StudentNaGodiniService,
    private evaluacijaZnanjaService: EvaluacijaZnanjaService,
    private ishodPredmetaService: IshodPredmetaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.studentNaGodiniService.getAll().subscribe(studentiNaGodini => {
    //   this.sviStudentiNaGodini = studentiNaGodini;

      this.evaluacijaZnanjaService.getAll().subscribe(evaluacijeZnanja => {
        this.sveEvaluacijeZnanja = evaluacijeZnanja;

        this.ishodPredmetaService.getAll().subscribe(ishodiPredmeta => {
          this.sviIshodiPredmeta = ishodiPredmeta;

          const idParam = this.route.snapshot.paramMap.get('id');
          if (idParam) {
            this.idIshodaEvaluacije = +idParam;
            this.ishodEvaluacijeService.getById(this.idIshodaEvaluacije).subscribe(ishodEvaluacije => {
              this.formaModel = this.kreirajModel(ishodEvaluacije);
            });
          } else {
            this.formaModel = this.kreirajModel();
          }
        })
      })
  //  })
  }

  otkazi(): void {
    this.router.navigate(['/ishodi-evaluacija']);
  }

  public sacuvajIshodEvaluacije(vrednosti: any): void {
    if (this.idIshodaEvaluacije) {
      this.ishodEvaluacijeService.update(this.idIshodaEvaluacije, vrednosti).subscribe({
        next: () => this.router.navigate(['/ishodi-evaluacija']),
        error: err => console.error('Greška pri izmeni ishoda evaluacije:', err)
      });
    } else {
      this.ishodEvaluacijeService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/ishodi-evaluacija']),
        error: err => console.error('Greška pri čuvanju ishoda evaluacije:', err)
      });
    }
  }

  private kreirajModel(podaci?: IshodEvaluacije): FormaModel {
    let selektovanStudentNaGodini = podaci?.studentNaGodini ?? null;
    let selektovanaEvaluacijaZnanja = podaci?.evaluacijaZnanja.tipEvaluacije ?? null;
    let selektovanIshodPredmeta = podaci?.ishodPredmeta ?? null;

    return {
      naziv: podaci ? 'Izmena ishoda evaluacije' : 'Dodavanje ishoda evaluacije',
      polja: [
        ...(podaci ? [{
          naziv: 'id',
          labela: '',
          tip: 'hidden',
          podrazumevanaVrednost: podaci.id
        }] : []),
        {
          naziv: 'bodovi',
          labela: 'Bodovi',
          tip: 'number',
          podrazumevanaVrednost: podaci?.bodovi ?? 0,
          validatori: [Validators.required]
        },
        {
          naziv: 'napomena',
          labela: 'Napomena',
          tip: 'textarea',
          podrazumevanaVrednost: podaci?.napomena ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'studentNaGodini',
          labela: 'Student na Godini',
          tip: 'select',
          podrazumevanaVrednost: selektovanStudentNaGodini,
          opcije: this.sviStudentiNaGodini,
          displayFn: (s: StudentNaGodini) => s.brojIndeksa,
          validatori: [Validators.required]
        },
        {
          naziv: 'evaluacijaZnanja',
          labela: 'Evaluacija Znanja',
          tip: 'select',
          podrazumevanaVrednost: selektovanaEvaluacijaZnanja,
          opcije: this.sveEvaluacijeZnanja,
          displayFn: (e: EvaluacijaZnanja) => e.tipEvaluacije.naziv,
          validatori: [Validators.required]
        },
        {
          naziv: 'ishodPredmeta',
          labela: 'Ishod Predmeta',
          tip: 'select',
          podrazumevanaVrednost: selektovanIshodPredmeta,
          opcije: this.sviIshodiPredmeta,
          displayFn: (i: IshodPredmeta) => `${i.ocena}`,
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
