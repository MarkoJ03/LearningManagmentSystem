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
import { RealizacijaPredmeta } from '../../../../models/RealizacijaPredmeta';

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
  sviTipoviNastave: TipNastave[] = [];
  sviPredmeti: Predmet[] = [];
  sviTerminiNastave: TerminNastave[] = [];

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
      const izmenjenaRealizacija = {
        ...vrednosti,
        predmeti: vrednosti.predmeti.map((p: Predmet) => ({
          predmet: { id: p.id },
          realizacijaPredmeta: { id: this.idRealizacijePredmeta },
          vidljiv: true
        }))
      };

      this.realizacijaPredmetaService.update(this.idRealizacijePredmeta, izmenjenaRealizacija).subscribe({
        next: () => this.router.navigate(['/realizacije-predmeta']),
        error: err => console.error('Greška pri izmeni realizacije predmeta:', err)
      });
    } else {
      const novPredmet = {
        ...vrednosti,
        predmeti: vrednosti.predmeti.map((p: Predmet) => ({
          predmet: { id: p.id },
          realizacijaPredmeta: { id: this.idRealizacijePredmeta },
          vidljiv: true
        }))
      };

      this.realizacijaPredmetaService.create(novPredmet).subscribe({
        next: () => this.router.navigate(['/realizacije-predmeta']),
        error: err => console.error('Greška pri čuvanju realizacije predmeta:', err)
      });
    }
  }

  private kreirajModel(podaci?: RealizacijaPredmeta): FormaModel {
    let selektovaniNastavnik = podaci?.nastavnik ?? null;
    let selektovaniTipNastave = podaci?.tipNastave ?? null;
    let selektovaniPredmet: Predmet[] = podaci?.predmeti?.map(p => p.predmet) ?? [];
    let selektovaniTerminiNastave = podaci?.terminiNastave ?? [];


    return {
      naziv: podaci ? 'Izmena realizacije predmeta' : 'Dodavanje realizacije predmeta',
      polja: [
        ...(podaci ? [{
          naziv: 'id',
          labela: '',
          tip: 'hidden',
          podrazumevanaVrednost: podaci.id
        }] : []),
        {
          naziv: 'nastavnik',
          labela: 'Nastavnik',
          tip: 'select',
          podrazumevanaVrednost: selektovaniNastavnik,
          opcije: this.sviNastavnici,
          displayFn: (n: Nastavnik) => `${n.ime} ${n.prezime}`,
          validatori: [Validators.required]
        },
        {
          naziv: 'tipNastave',
          labela: 'Tip Nastave',
          tip: 'select',
          podrazumevanaVrednost: selektovaniTipNastave,
          opcije: this.sviTipoviNastave,
          displayFn: (t: TipNastave) => t.naziv,
          validatori: [Validators.required]
        },
        {
          naziv: 'predmeti',
          labela: 'Predmet',
          tip: 'checkbox-list',
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
