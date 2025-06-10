import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerickaFormaComponent } from '../../../genericka-forma/genericka-forma.component';
import { FormaModel } from '../../../genericka-forma/FormaModel';
import { TerminNastaveService } from '../../../../services/termin-nastave.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RealizacijaPredmeta } from '../../../../models/RealizacijaPredmeta';
import { Kalendar } from '../../../../models/Kalendar';
import { RealizacijaPredmetaService } from '../../../../services/realizacija-predmeta.service';
import { KalendarService } from '../../../../services/kalendar.service';
import { TerminNastave } from '../../../../models/TerminNastave';

@Component({
  selector: 'app-termin-nastave-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './termin-nastave-forma.component.html',
  styleUrl: './termin-nastave-forma.component.css'
})
export class TerminNastaveFormaComponent {
  formaModel: FormaModel | null = null;
  idTerminaNastave: number | null = null;
  sveRealizacijePredmeta: RealizacijaPredmeta[] = [];
  sviKalendari: Kalendar[] = [];

  constructor(
    private terminNastaveService: TerminNastaveService,
    private realizacijaPredmetaService: RealizacijaPredmetaService,
    private kalendarService: KalendarService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.realizacijaPredmetaService.getAll().subscribe(realizacijePredmeta => {
      this.sveRealizacijePredmeta = realizacijePredmeta;

      this.kalendarService.getAll().subscribe(kalendari => {
        this.sviKalendari = kalendari;

        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
          this.idTerminaNastave = +idParam;
          this.terminNastaveService.getById(this.idTerminaNastave).subscribe(terminNastave => {
            this.formaModel = this.kreirajModel(terminNastave);
          });
        } else {
          this.formaModel = this.kreirajModel();
        }
      })

    })
  }

  otkazi(): void {
    this.router.navigate(['/termini-nastave']);
  }

  public sacuvajTerminNastave(vrednosti: any): void {
    if (this.idTerminaNastave) {
      this.terminNastaveService.update(this.idTerminaNastave, vrednosti).subscribe({
        next: () => this.router.navigate(['/termini-nastave']),
        error: err => console.error('Greška pri izmeni termina nastave:', err)
      });
    } else {
      this.terminNastaveService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/termini-nastave']),
        error: err => console.error('Greška pri čuvanju termina nastave:', err)
      });
    }
  }

  private kreirajModel(podaci?: TerminNastave): FormaModel {
    let selektovanaRealizacijaPredmeta = podaci?.realizacijaPredmeta ?? null;
    let selektovaniKalendar = podaci?.kalendar ?? null;

    return {
      naziv: podaci ? 'Izmena termina nastave' : 'Dodavanje termina nastave',
      polja: [
        ...(podaci ? [{
          naziv: 'id',
          labela: '',
          tip: 'hidden',
          podrazumevanaVrednost: podaci.id
        }] : []),
        {
          naziv: 'vremePocetka',
          labela: 'Vreme Pocetka',
          tip: 'date',
          podrazumevanaVrednost: podaci?.vremePocetka ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'vremeKraja',
          labela: 'Vreme Kraja',
          tip: 'date',
          podrazumevanaVrednost: podaci?.vremeKraja ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'brojCasova',
          labela: 'Broj Casova',
          tip: 'number',
          podrazumevanaVrednost: podaci?.brojCasova ?? 0,
          validatori: [Validators.required]
        },
        {
          naziv: 'realizacijaPredmeta',
          labela: 'Realizacija Predmeta',
          tip: 'select',
          podrazumevanaVrednost: selektovanaRealizacijaPredmeta,
          opcije: this.sveRealizacijePredmeta,
          displayFn: (r: RealizacijaPredmeta) => `${r.predmet.naziv}`,
          validatori: [Validators.required]
        },
        {
          naziv: 'kalendar',
          labela: 'Kalendar',
          tip: 'select',
          podrazumevanaVrednost: selektovaniKalendar,
          opcije: this.sviKalendari,
          displayFn: (k: Kalendar) => `${k.id}`,
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
