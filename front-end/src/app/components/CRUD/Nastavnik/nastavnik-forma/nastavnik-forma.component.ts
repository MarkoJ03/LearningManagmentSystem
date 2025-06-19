import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerickaFormaComponent } from '../../../genericka-forma/genericka-forma.component';
import { FormaModel } from '../../../genericka-forma/FormaModel';
import { Departman } from '../../../../models/Departaman';
import { Korisnik } from '../../../../models/Korisnik';
import { Zvanje } from '../../../../models/Zvanje';
import { Katedra } from '../../../../models/Katedra';
import { RealizacijaPredmeta } from '../../../../models/RealizacijaPredmeta';
import { Obavestenje } from '../../../../models/Obavestenje';
import { EvaluacijaZnanja } from '../../../../models/EvaluacijaZnanja';
import { Nastavnik } from '../../../../models/Nastavnik';
import { NastavnikService } from '../../../../services/nastavnik.service';
import { DepartmanService } from '../../../../services/departman.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KorisnikService } from '../../../../services/korisnik.service';
import { ZvanjeService } from '../../../../services/zvanje.service';
import { KatedraService } from '../../../../services/katedra.service';
import { RealizacijaPredmetaService } from '../../../../services/realizacija-predmeta.service';
import { ObavestenjeService } from '../../../../services/obavestenje.service';
import { EvaluacijaZnanjaService } from '../../../../services/evaluacija-znanja.service';
import { DepartmanNastavnikService } from '../../../../services/departman-nastavnik.service';
import { KatedraNastavnikService } from '../../../../services/katedra-nastavnik.service';

@Component({
  selector: 'app-nastavnik-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './nastavnik-forma.component.html',
  styleUrl: './nastavnik-forma.component.css'
})
export class NastavnikFormaComponent {
  formaModel: FormaModel | null = null;
  idNastavnika: number | null = null;
  sviKorisnici: Korisnik[] = [];
  svaZvanja: Zvanje[] = [];
  sviDepartmani: Departman[] = [];
  sveKatedre: Katedra[] = [];
  sveRealizacijePredmeta: RealizacijaPredmeta[] = [];
  svaObavestenja: Obavestenje[] = [];
  sveEvaluacijeZnanja: EvaluacijaZnanja[] = [];
  kreiraniNastavnik: Nastavnik | null = null;

  constructor(
    private nastavnikService: NastavnikService,
    private korisnikService: KorisnikService,
    private departmanNastavnikService: DepartmanNastavnikService,
    private katedraNastavnikService: KatedraNastavnikService,
    private zvanjaService: ZvanjeService,
    private departmanService: DepartmanService,
    private katedreService: KatedraService,
    private realizacijaPredmetaService: RealizacijaPredmetaService,
    private obavestenjaService: ObavestenjeService,
    private evaluacijaZnanjaService: EvaluacijaZnanjaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.departmanService.getAll().subscribe(departmani => {
      this.sviDepartmani = departmani;

      this.zvanjaService.getAll().subscribe(zvanja => {
        this.svaZvanja = zvanja;

        this.katedreService.getAll().subscribe(katedre => {
          this.sveKatedre = katedre;

          this.realizacijaPredmetaService.getAll().subscribe(realizacijePredmeta => {
            this.sveRealizacijePredmeta = realizacijePredmeta;

            this.obavestenjaService.getAll().subscribe(obavestenja => {
              this.svaObavestenja = obavestenja;

              this.evaluacijaZnanjaService.getAll().subscribe(evaluacijeZnanja => {
                this.sveEvaluacijeZnanja = evaluacijeZnanja;

                this.korisnikService.getAll().subscribe(korisnici => {
                  this.sviKorisnici = korisnici;

                  const idParam = this.route.snapshot.paramMap.get('id');
                  if (idParam) {
                    this.idNastavnika = +idParam;
                    this.nastavnikService.getById(this.idNastavnika).subscribe(nastavnik => {
                      this.formaModel = this.kreirajModel(nastavnik);
                    });
                  } else {
                    this.formaModel = this.kreirajModel();
                  }
                })

              })
            })
          })
        })
      })
    })
  }

  otkazi(): void {
    this.router.navigate(['/nastavnici']);
  }

  public sacuvajNastavnika(vrednosti: any): void {
    if (this.idNastavnika) {
      this.nastavnikService.update(this.idNastavnika, vrednosti).subscribe({
        next: () => this.router.navigate(['/nastavnici']),
        error: err => console.error('Greška pri izmeni nastavnika:', err)
      });
    } else {
      this.nastavnikService.create(vrednosti).subscribe({
        next: (nastavnik) => {
          this.kreiraniNastavnik = nastavnik; 

          for (const departman of vrednosti.departmani) {
            const veza = {
              id: null, 
              departman: departman, 
              nastavnik: nastavnik, 
              vidljiv: true
            };

            this.departmanNastavnikService.create(veza).subscribe({
              next: () => console.log(`Povezan departman ${departman.id} sa nastavnikom ${nastavnik.id}`),
              error: err => console.error('Greška pri vezivanju departmana:', err)
            });
          }

          for (const katedra of vrednosti.katedre) {
            const veza = {
              id: null,
              katedra: katedra,           
              nastavnik: nastavnik, 
              vidljiv: true
            };

            this.katedraNastavnikService.create(veza).subscribe({
              next: () => console.log(`Povezana katedra ${katedra.id} sa nastavnikom ${nastavnik.id}`),
              error: err => console.error('Greška pri vezivanju katedre:', err)
            });
          }

          this.router.navigate(['/nastavnici']);
        },
        error: err => console.error('Greška pri čuvanju nastavnika:', err)
      });
    }
  }

  private kreirajModel(podaci?: Nastavnik): FormaModel {
    let selektovaniKorisnik = podaci?.korisnik ?? null;
    let selektovaniDepartmani = podaci?.departmani ?? [];
    let selektovanaZvanja = podaci?.zvanja ?? [];
    let selektovaneKatedre = podaci?.katedre ?? [];
    let selektovaneRealizacijePredmeta = podaci?.realizacijePredmeta ?? [];
    let selektovanaObavestenja = podaci?.obavestenja ?? [];
    let selektovaneEvaluacijeZnanja = podaci?.evaluacijeZnanja ?? [];

    return {
      naziv: podaci ? 'Izmena nastavnika' : 'Dodavanje nastavnika',
      polja: [
        ...(podaci ? [{
          naziv: 'id',
          labela: '',
          tip: 'hidden',
          podrazumevanaVrednost: podaci.id
        }] : []),
        {
          naziv: 'korisnik',
          labela: 'Korisnik',
          tip: 'select',
          podrazumevanaVrednost: selektovaniKorisnik,
          opcije: this.sviKorisnici,
          displayFn: (k: Korisnik) => k.email,
          validatori: [Validators.required]
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
          labela: 'Jmbg',
          tip: 'text',
          podrazumevanaVrednost: podaci?.jmbg ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'zvanja',
          labela: 'Zvanja',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovanaZvanja,
          opcije: this.svaZvanja,
          displayFn: (z: Zvanje) => z.tipZvanja.naziv,
          validatori: [Validators.required]
        },
        {
          naziv: 'departmani',
          labela: 'Departmani',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovaniDepartmani,
          opcije: this.sviDepartmani,
          displayFn: (d: Departman) => d.naziv,
          validatori: [Validators.required]
        },
        {
          naziv: 'katedre',
          labela: 'Katedre',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovaneKatedre,
          opcije: this.sveKatedre,
          displayFn: (k: Katedra) => k.naziv,
          validatori: [Validators.required]
        },
        {
          naziv: 'realizacijePredmeta',
          labela: 'Realizacije Predmeta',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovaneRealizacijePredmeta,
          opcije: this.sveRealizacijePredmeta,
          displayFn: (r: RealizacijaPredmeta) => `${r.id}`,
          validatori: [Validators.required]
        },
        {
          naziv: 'obavestenja',
          labela: 'Obavestenja',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovanaObavestenja,
          opcije: this.svaObavestenja,
          displayFn: (o: Obavestenje) => o.naslov,
          validatori: [Validators.required]
        },
        {
          naziv: 'evaluacijeZnanja',
          labela: 'Evaluacije Znanja',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovaneEvaluacijeZnanja,
          opcije: this.sveEvaluacijeZnanja,
          displayFn: (e: EvaluacijaZnanja) => `${e.predmet.naziv} ${e.tipEvaluacije.naziv}`,
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
