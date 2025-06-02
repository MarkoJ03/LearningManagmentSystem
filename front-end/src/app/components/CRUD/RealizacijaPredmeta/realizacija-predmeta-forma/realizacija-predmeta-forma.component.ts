import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerickaFormaComponent } from '../../../genericka-forma/genericka-forma.component';
import { FormaModel } from '../../../genericka-forma/FormaModel';
import { Nastavnik } from '../../../../models/Nastavnik';
import { Predmet } from '../../../../models/Predmet';
import { IshodPredmeta } from '../../../../models/IshodPredmeta';
import { TerminNastave } from '../../../../models/TerminNastave';
import { RealizacijaPredmetaService } from '../../../../services/realizacija-predmeta.service';
import { NastavnikService } from '../../../../services/nastavnik.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PredmetService } from '../../../../services/predmet.service';
import { IshodPredmetaService } from '../../../../services/ishod-predmeta.service';
import { TerminNastaveService } from '../../../../services/termin-nastave.service';
import { TipNastave } from '../../../../models/TipNastave';
import { TipNastaveService } from '../../../../services/tip-nastave.service';

@Component({
  selector: 'app-realizacija-predmeta-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './realizacija-predmeta-forma.component.html',
  styleUrl: './realizacija-predmeta-forma.component.css'
})
export class RealizacijaPredmetaFormaComponent {
  formaModel: FormaModel | null = null;
  idRealizacijePredmeta: number | null = null;
  sviNastavnici: Nastavnik[] = [];
  selektovaniNastavnik: Nastavnik | null = null;
  sviTipoviNastave: TipNastave[] = [];
  selektovaniTipNastave: TipNastave | null = null;
  sviPredmeti: Predmet[] = [];
  selektovaniPredmet: Predmet | null = null;
  sviTerminiNastave: TerminNastave[] = [];
  selektovaniTerminiNastave: TerminNastave[] = [];


  constructor(
    private realizacijaPredmetaService: RealizacijaPredmetaService,
    private nastavnikService: NastavnikService,
    private predmetService: PredmetService,
    private terminNastaveService: TerminNastaveService,
    private tipNastaveService: TipNastaveService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.nastavnikService.getAll().subscribe(nastavnici => {
      this.sviNastavnici = nastavnici;

      this.predmetService.getAll().subscribe(predmeti => {
        this.sviPredmeti = predmeti;

        this.terminNastaveService.getAll().subscribe(terminiNastave => {
          this.sviTerminiNastave = terminiNastave;

          this.tipNastaveService.getAll().subscribe(tipoviNastave => {
            this.sviTipoviNastave = tipoviNastave;

            const idParam = this.route.snapshot.paramMap.get('id');
            if (idParam) {
              this.idRealizacijePredmeta = +idParam;
              this.realizacijaPredmetaService.getById(this.idRealizacijePredmeta).subscribe(naucnaOblast => {
                this.formaModel = this.kreirajModel(naucnaOblast);
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
    this.router.navigate(['/realizacije-predmeta']);
  }

  public sacuvajRealizacijuPredmeta(vrednosti: any): void {
    if (this.idRealizacijePredmeta) {
      this.realizacijaPredmetaService.update(this.idRealizacijePredmeta, vrednosti).subscribe({
        next: () => this.router.navigate(['/realizacije-predmeta']),
        error: err => console.error('Greška pri izmeni realizacije predmeta:', err)
      });
    } else {
      this.realizacijaPredmetaService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/realizacije-predmeta']),
        error: err => console.error('Greška pri čuvanju realizacije predmeta:', err)
      });
    }
  }

  private kreirajModel(podaci?: any): FormaModel {
    let selektovaniNastavnik = podaci?.nastavnik ?? null;
    let selektovaniTipNastave = podaci?.tipNastave ?? null;
    let selektovaniPredmet = podaci?.predmet ?? null;
    let selektovaniTerminiNastave = podaci?.terminiNastave ?? [];


    return {
      naziv: podaci ? 'Izmena realizacije predmeta' : 'Dodavanje realizacije predmeta',
      polja: [
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
          naziv: 'tipNastave',
          labela: 'Tip Nastave',
          tip: 'select',
          podrazumevanaVrednost: selektovaniTipNastave,
          opcije: this.sviTerminiNastave,
          displayFn: (t: TipNastave) => t.naziv,
          validatori: [Validators.required]
        },
        {
          naziv: 'predmet',
          labela: 'Predmet',
          tip: 'select',
          podrazumevanaVrednost: selektovaniPredmet,
          opcije: this.sviPredmeti,
          displayFn: (p: Predmet) => p.naziv,
          validatori: [Validators.required]
        },
        {
          naziv: 'terminiNastave',
          labela: 'Termini Nastave',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovaniTerminiNastave,
          opcije: this.sviTerminiNastave,
          displayFn: (t: TerminNastave) => `${t.vremePocetka}` && `${t.vremeKraja}`,
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
