import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerickaFormaComponent } from '../../../genericka-forma/genericka-forma.component';
import { FormaModel } from '../../../genericka-forma/FormaModel';
import { Nastavnik } from '../../../../models/Nastavnik';
import { Predmet } from '../../../../models/Predmet';
import { ObavestenjeService } from '../../../../services/obavestenje.service';
import { PredmetService } from '../../../../services/predmet.service';
import { NastavnikService } from '../../../../services/nastavnik.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-obavestenje-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './obavestenje-forma.component.html',
  styleUrl: './obavestenje-forma.component.css'
})
export class ObavestenjeFormaComponent {
  formaModel: FormaModel | null = null;
  idObavestenja: number | null = null;
  selektovaniNastavnik: Nastavnik | null = null;
  sviNastavnici: Nastavnik[] = [];
  selektovaniPredmet: Predmet | null = null;
  sviPredmeti: Predmet[] = [];

  constructor(
    private obavestenjeService: ObavestenjeService,
    private predmetService: PredmetService,
    private nastavnikService: NastavnikService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.predmetService.getAll().subscribe(predmeti => {
      this.sviPredmeti = predmeti;

      this.nastavnikService.getAll().subscribe(nastavnici => {
        this.sviNastavnici = nastavnici;

        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
          this.idObavestenja = +idParam;
          this.obavestenjeService.getById(this.idObavestenja).subscribe(obavestenje => {
            this.formaModel = this.kreirajModel(obavestenje);
          });
        } else {
          this.formaModel = this.kreirajModel();
        }
      })
    })
  }

  otkazi(): void {
    this.router.navigate(['/obavestenja']);
  }

  public sacuvajObavestenje(vrednosti: any): void {
    if (this.idObavestenja) {
      this.obavestenjeService.update(this.idObavestenja, vrednosti).subscribe({
        next: () => this.router.navigate(['/obavestenja']),
        error: err => console.error('Greška pri izmeni obavestenja:', err)
      });
    } else {
      this.obavestenjeService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/obavestenja']),
        error: err => console.error('Greška pri čuvanju obavestenja:', err)
      });
    }
  }

  private kreirajModel(podaci?: any): FormaModel {
    //let selektovaniFakulteti = null;
    //if (podaci?.fakultet) {
    let selektovaniNastavnik = podaci?.nastavnik ?? null;
    let selektovaniPredmet = podaci?.predmet ?? null;
    //}

    return {
      naziv: podaci ? 'Izmena obavestenja' : 'Dodavanje obavestenja',
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
          naziv: 'naslov',
          labela: 'Naslov',
          tip: 'text',
          podrazumevanaVrednost: podaci?.naslov ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'sadrzaj',
          labela: 'Sadrzaj',
          tip: 'textarea',
          podrazumevanaVrednost: podaci?.sadrzaj ?? '',
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
