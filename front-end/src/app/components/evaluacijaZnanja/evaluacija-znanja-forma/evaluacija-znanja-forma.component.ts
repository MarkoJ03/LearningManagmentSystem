import { Component, OnInit } from '@angular/core';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { IshodEvaluacije } from '../../../models/IshodEvaluacije';
import { Nastavnik } from '../../../models/Nastavnik';
import { Kalendar } from '../../../models/Kalendar';
import { Predmet } from '../../../models/Predmet';
import { TipEvaluacije } from '../../../models/TipEvaluacije';
import { EvaluacijaZnanja } from '../../../models/EvaluacijaZnanja';

import { EvaluacijaZnanjaService } from '../../../services/evaluacija-znanja.service';
import { IshodEvaluacijeService } from '../../../services/ishod-evaluacije.service';
import { NastavnikService } from '../../../services/nastavnik.service';
import { KalendarService } from '../../../services/kalendar.service';
import { PredmetService } from '../../../services/predmet.service';
import { TipEvaluacijeService } from '../../../services/tip-evaluacije.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-evaluacija-znanja-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './evaluacija-znanja-forma.component.html',
  styleUrls: ['./evaluacija-znanja-forma.component.css']
})
export class EvaluacijaZnanjaFormaComponent implements OnInit {

  formaModel: FormaModel | null = null;
  idEvaluacijaZnanja: number | null = null;

  selektovaniIshodiEvaluacije: IshodEvaluacije[] = [];
  sviIshodiEvaluacije: IshodEvaluacije[] = [];
  sviNastavnici: Nastavnik[] = [];
  sviKalendari: Kalendar[] = [];
  sviPredmeti: Predmet[] = [];
  sviTipoviEvaluacije: TipEvaluacije[] = [];

  kreiranaEvaluacijaZnanja: EvaluacijaZnanja | null = null;

  constructor(
    private evaluacijaZnanjaService: EvaluacijaZnanjaService,
    private ishodEvaluacijeService: IshodEvaluacijeService,
    private nastavnikService: NastavnikService,
    private kalendarService: KalendarService,
    private predmetService: PredmetService,
    private tipEvaluacijeService: TipEvaluacijeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ishodEvaluacijeService.getAll().subscribe(ishodiEvaluacije => {
      this.sviIshodiEvaluacije = ishodiEvaluacije;

      this.nastavnikService.getAll().subscribe(nastavnici => {
        this.sviNastavnici = nastavnici;

        this.kalendarService.getAll().subscribe(kalendari => {
          this.sviKalendari = kalendari;

          this.predmetService.getAll().subscribe(predmeti => {
            this.sviPredmeti = predmeti;

            this.tipEvaluacijeService.getAll().subscribe(tipovi => {
              this.sviTipoviEvaluacije = tipovi;

              const idParam = this.route.snapshot.paramMap.get('id');
              if (idParam) {
                this.idEvaluacijaZnanja = +idParam;
                this.evaluacijaZnanjaService.getById(this.idEvaluacijaZnanja).subscribe(evaluacijaZnanja => {
                  this.formaModel = this.kreirajModel(evaluacijaZnanja);

                  const ishodiEvaluacijeZaEvaluacijuZnanja = this.sviIshodiEvaluacije.filter(
                    k => k.evaluacijaZnanja?.id === evaluacijaZnanja.id
                  );
                  console.log('Ishodi evaluacije za evaluaciju znanja:', ishodiEvaluacijeZaEvaluacijuZnanja);
                });
              } else {
                this.formaModel = this.kreirajModel();
              }
            });
          });
        });
      });
    });
  }

  otkazi(): void {
    this.router.navigate(['/EvaluacijaZnanja']);
  }

  sacuvaj(vrednosti: any): void {
    console.log("Čuvanje evaluacije znanja sa vrednostima:", vrednosti);
    vrednosti.ishodEvaluacije = vrednosti.ishodEvaluacije || [];

    if (this.idEvaluacijaZnanja) {
      this.evaluacijaZnanjaService.update(this.idEvaluacijaZnanja, vrednosti).subscribe({
        next: () => {
          this.router.navigate(['/EvaluacijaZnanja']);
          this.kreiranaEvaluacijaZnanja = vrednosti;
        },
        error: err => {
          console.error('Greška prilikom ažuriranja evaluacije znanja:', err);
        }
      });
    } else {
      this.evaluacijaZnanjaService.create(vrednosti).subscribe({
        next: (evaluacija) => {
          this.kreiranaEvaluacijaZnanja = evaluacija;
          console.log('Kreirana evaluacija:', evaluacija);

          if (vrednosti.ishodEvaluacije && vrednosti.ishodEvaluacije.length > 0) {
            vrednosti.ishodEvaluacije.forEach((ishod: any) => {
              const noviIshod = {
                ...ishod,
                evaluacija: evaluacija 
              };

              this.ishodEvaluacijeService.create(noviIshod).subscribe({
                next: () => console.log(`Sačuvan ishod evaluacije: ${ishod.naziv || ishod.id}`),
                error: err => console.error('Greška pri čuvanju ishoda evaluacije:', err)
              });
            });
          }

          this.router.navigate(['/EvaluacijaZnanja']);
        },
        error: err => console.error('Greška pri čuvanju evaluacije:', err)
      });
    }
  }

  private kreirajModel(podaci?: EvaluacijaZnanja): FormaModel {
    const selektovaniIshodiEvaluacije = podaci?.ishodEvaluacije ?? [];

    return {
      naziv: podaci ? 'Izmena evaluacije znanja' : 'Dodavanje evaluacije znanja',
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
          naziv: 'kalendar',
          labela: 'Kalendar',
          tip: 'select',
          podrazumevanaVrednost: podaci?.kalendar ?? null,
          opcije: this.sviKalendari,
          displayFn: (k: Kalendar) => `${k.id}`,
          validatori: [Validators.required]
        },
        {
          naziv: 'nastavnik',
          labela: 'Nastavnik',
          tip: 'select',
          podrazumevanaVrednost: podaci?.nastavnik ?? null,
          opcije: this.sviNastavnici,
          displayFn: (n: Nastavnik) => `${n.ime} ${n.prezime}`,
          validatori: [Validators.required]
        },
        {
          naziv: 'predmet',
          labela: 'Predmet',
          tip: 'select',
          podrazumevanaVrednost: podaci?.predmet ?? null,
          opcije: this.sviPredmeti,
          displayFn: (p: Predmet) => p.naziv,
          validatori: [Validators.required]
        },
        {
          naziv: 'tip_evaluacije',
          labela: 'Tip evaluacije',
          tip: 'select',
          podrazumevanaVrednost: podaci?.tipEvaluacije ?? null,
          opcije: this.sviTipoviEvaluacije,
          displayFn: (t: TipEvaluacije) => t.naziv,
          validatori: [Validators.required]
        },
        {
          naziv: 'vreme_pocetka',
          labela: 'Vreme početka',
          tip: 'datetime-local',
          podrazumevanaVrednost: podaci ? this.formatDateTimeLocal(podaci.vremePocetka) : '',
          validatori: [Validators.required]
        },
        {
          naziv: 'vreme_zavrsetka',
          labela: 'Vreme završetka',
          tip: 'datetime-local',
          podrazumevanaVrednost: podaci ? this.formatDateTimeLocal(podaci.vremeZavrsetka) : '',
          validatori: [Validators.required]
        },
        {
          naziv: 'ishodEvaluacije',
          labela: 'Ishodi evaluacije',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovaniIshodiEvaluacije,
          opcije: this.sviIshodiEvaluacije,
          displayFn: (i: IshodEvaluacije) => i.napomena 
        }
      ]
    };
  }

  private formatDateTimeLocal(date: Date | string): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    console.warn('Nevalidan datum:', date);
    return '';
  }

  const pad = (n: number) => n < 10 ? '0' + n : n;
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}


}
