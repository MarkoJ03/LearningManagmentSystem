import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerickaFormaComponent } from '../../../genericka-forma/genericka-forma.component';
import { FormaModel } from '../../../genericka-forma/FormaModel';
import { Nastavnik } from '../../../../models/Nastavnik';
import { Kalendar } from '../../../../models/Kalendar';
import { TipEvaluacije } from '../../../../models/TipEvaluacije';
import { IshodEvaluacije } from '../../../../models/IshodEvaluacije';
import { EvaluacijaZnanjaService } from '../../../../services/evaluacija-znanja.service';
import { NastavnikService } from '../../../../services/nastavnik.service';
import { KalendarService } from '../../../../services/kalendar.service';
import { TipEvaluacijeService } from '../../../../services/tip-evaluacije.service';
import { IshodEvaluacijeService } from '../../../../services/ishod-evaluacije.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-evaluacija-znanja-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './evaluacija-znanja-forma.component.html',
  styleUrl: './evaluacija-znanja-forma.component.css'
})
export class EvaluacijaZnanjaFormaComponent {
  formaModel: FormaModel | null = null;
  idEvaluacijeZnanja: number | null = null;
  sviKalendari: Kalendar[] = [];
  selektovaniKalendar: Kalendar | null = null;
  sviNastavnici: Nastavnik[] = [];
  selektovaniNastavnik: Nastavnik | null = null;
  sviTipoviEvaluacije: TipEvaluacije[] = [];
  selektovaniTipEvaluacije: TipEvaluacije | null = null;
  sviIshodiEvaluacije: IshodEvaluacije[] = [];
  selektovaniIshodiEvaluacije: [] = [];


  constructor(
    private evaluacijaZnanjaService: EvaluacijaZnanjaService,
    private kalendarService: KalendarService,
    private nastavnikService: NastavnikService,
    private tipEvaluacijeService: TipEvaluacijeService,
    private ishodEvaluacijeService: IshodEvaluacijeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.nastavnikService.getAll().subscribe(nastavnici => {
      this.sviNastavnici = nastavnici;

      this.kalendarService.getAll().subscribe(kalendari => {
        this.sviKalendari = kalendari;

        this.tipEvaluacijeService.getAll().subscribe(tipoviEvaluacije => {
          this.sviTipoviEvaluacije = tipoviEvaluacije;

          this.tipEvaluacijeService.getAll().subscribe(tipoviEvaluacije => {
            this.sviTipoviEvaluacije = tipoviEvaluacije;

            const idParam = this.route.snapshot.paramMap.get('id');
            if (idParam) {
              this.idEvaluacijeZnanja = +idParam;
              this.evaluacijaZnanjaService.getById(this.idEvaluacijeZnanja).subscribe(evaluacijaZnanja => {
                this.formaModel = this.kreirajModel(evaluacijaZnanja);
              });
            } else {
              this.formaModel = this.kreirajModel();
            }
          })
        })
      })
    })
  }

  otkazi(): void {
    this.router.navigate(['/evaluacije-znanja']);
  }

  public sacuvajEvaluacijuZnanja(vrednosti: any): void {
    if (this.idEvaluacijeZnanja) {
      this.evaluacijaZnanjaService.update(this.idEvaluacijeZnanja, vrednosti).subscribe({
        next: () => this.router.navigate(['/evaluacije-znanja']),
        error: err => console.error('Greška pri izmeni evaluacije znanja:', err)
      });
    } else {
      this.evaluacijaZnanjaService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/evaluacije-znanja']),
        error: err => console.error('Greška pri čuvanju evaluacije znanja:', err)
      });
    }
  }

  private kreirajModel(podaci?: any): FormaModel {
    //let selektovaniFakulteti = null;
    //if (podaci?.fakultet) {
    let selektovaniNastavnik = podaci?.nastavnik ?? null;
    let selektovaniKalendar = podaci?.kalendar ?? null;
    let selektovaniTipEvaluacije = podaci?.tipEvaluacije ?? null;
    let selektovaniIshodiEvaluacije = podaci?.ishodiEvaluacije ?? [];
    //}

    return {
      naziv: podaci ? 'Izmena evaluacije znanja' : 'Dodavanje evaluacije znanja',
      polja: [
        {
          naziv: 'kalendar',
          labela: 'Kalendar',
          tip: 'select',
          podrazumevanaVrednost: selektovaniKalendar,
          opcije: this.sviKalendari,
          displayFn: (k: Kalendar) => `${k.grupaStudenata}`,
          validatori: [Validators.required]
        },
        {
          naziv: 'nastavnik',
          labela: 'Nastavnik',
          tip: 'select',
          podrazumevanaVrednost: selektovaniNastavnik,
          opcije: this.sviNastavnici,
          displayFn: (n: Nastavnik) => n.ime && n.prezime,
          validatori: [Validators.required]
        },
        {
          naziv: 'tipEvaluacije',
          labela: 'Tip Evaluacije',
          tip: 'select',
          podrazumevanaVrednost: selektovaniTipEvaluacije,
          opcije: this.sviTipoviEvaluacije,
          displayFn: (t: TipEvaluacije) => t.naziv,
          validatori: [Validators.required]
        },
        {
          naziv: 'vremePocetka',
          labela: 'Vreme Pocetka',
          tip: 'date',
          podrazumevanaVrednost: podaci?.vremePocetka ?? null,
          validatori: [Validators.required]
        },
        {
          naziv: 'vremeZavrsetka',
          labela: 'Vreme Zavrsetka',
          tip: 'date',
          podrazumevanaVrednost: podaci?.vremePocetka ?? null,
          validatori: [Validators.required]
        },
        {
          naziv: 'ishodiEvaluacije',
          labela: 'Ishodi Evaluacije',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovaniIshodiEvaluacije,
          opcije: this.sviIshodiEvaluacije,
          displayFn: (i: IshodEvaluacije) => `${i.ishodPredmeta}`,
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
