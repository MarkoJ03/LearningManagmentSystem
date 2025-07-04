import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerickaFormaComponent } from '../../../genericka-forma/genericka-forma.component';
import { FormaModel } from '../../../genericka-forma/FormaModel';
import { EvaluacijaZnanja } from '../../../../models/EvaluacijaZnanja';
import { RealizacijaPredmeta } from '../../../../models/RealizacijaPredmeta';
import { Obavestenje } from '../../../../models/Obavestenje';
import { DokumentiPredmeta } from '../../../../models/DokumentiPredmeta';
import { PredmetService } from '../../../../services/predmet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupaStudenataPredmetService } from '../../../../services/grupa-studenata-predmet.service';
import { EvaluacijaZnanjaService } from '../../../../services/evaluacija-znanja.service';
import { RealizacijaPredmetaService } from '../../../../services/realizacija-predmeta.service';
import { ObavestenjeService } from '../../../../services/obavestenje.service';
import { DokumentiPredmetService } from '../../../../services/dokumenti-predmet.service';
import { Predmet } from '../../../../models/Predmet';
import { GrupaStudenata } from '../../../../models/GrupaStudenata';
import { GrupaStudenataPredmet } from '../../../../models/GrupaStudenataPredmet';
import { GrupaStudenataService } from '../../../../services/grupa-studenata.service';

@Component({
  selector: 'app-predmet-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './predmet-forma.component.html',
  styleUrl: './predmet-forma.component.css'
})
export class PredmetFormaComponent {
  formaModel: FormaModel | null = null;
  idPredmeta: number | null = null;
  sveEvaluacijeZnanja: EvaluacijaZnanja[] = [];
  sveRealizacijePredmeta: RealizacijaPredmeta[] = [];
  svaObavestenja: Obavestenje[] = [];
  sviDokumentiPredmeta: DokumentiPredmeta[] = [];
  kreiraniPredmet: Predmet | null = null;
  sveGrupeStudenata: GrupaStudenata[] = [];

  constructor(
    private predmetService: PredmetService,
    private evaluacijaZnanjaService: EvaluacijaZnanjaService,
    private realizacijaPredmetaService: RealizacijaPredmetaService,
    private obavestenjeService: ObavestenjeService,
    private dokumentiPredmetaService: DokumentiPredmetService,
    private router: Router,
    private route: ActivatedRoute,
    private grupaStudenataService: GrupaStudenataService,
    private grupaStudenataPredmetService: GrupaStudenataPredmetService
  ) { }

  ngOnInit(): void {
    this.evaluacijaZnanjaService.getAll().subscribe(evaluacijeZnanja => {
      this.sveEvaluacijeZnanja = evaluacijeZnanja;

      this.realizacijaPredmetaService.getAll().subscribe(realizacijePredmeta => {
        this.sveRealizacijePredmeta = realizacijePredmeta;

        this.obavestenjeService.getAll().subscribe(obavestenja => {
          this.svaObavestenja = obavestenja;

          this.dokumentiPredmetaService.getAll().subscribe(dokumentiPredmeta => {
            this.sviDokumentiPredmeta = dokumentiPredmeta;

            this.grupaStudenataService.getAll().subscribe(grupeStudenata => {
              this.sveGrupeStudenata = grupeStudenata;


              const idParam = this.route.snapshot.paramMap.get('id');
              if (idParam) {
                this.idPredmeta = +idParam;
                this.predmetService.getById(this.idPredmeta).subscribe(predmet => {
                  this.formaModel = this.kreirajModel(predmet);
                });
              } else {
                this.formaModel = this.kreirajModel();
              }
            })
          })
        })
      });
    });
  }

  otkazi(): void {
    this.router.navigate(['/predmeti']);
  }

  public sacuvajPredmet(vrednosti: any): void {
    if (this.idPredmeta) {
      const izmenjenPredmet = {
        ...vrednosti,
        grupeStudenata: vrednosti.grupeStudenata.map((gs: GrupaStudenata) => ({
          grupaStudenata: { id: gs.id },
          predmet: { id:this.idPredmeta},
          vidljiv: true
        })),
        realizacijePredmeta: vrednosti.realizacijePredmeta.map((rp: RealizacijaPredmeta) => ({
          realizacijaPredmeta: { id: rp.id },
          predmet: { id:this.idPredmeta},
          vidljiv: true
        }))
      };

      this.predmetService.update(this.idPredmeta, izmenjenPredmet).subscribe({
        next: () => this.router.navigate(['/predmeti']),
        error: err => console.error('Greška pri izmeni predmeta:', err)
      });
    } else {
      const novPredmet = {
        ...vrednosti,
        grupeStudenata: vrednosti.grupeStudenata.map((gs: GrupaStudenata) => ({
          grupaStudenata: { id: gs.id },
          predmet: { id:this.idPredmeta},
          vidljiv: true
        })),
        realizacijePredmeta: vrednosti.realizacijePredmeta.map((rp: RealizacijaPredmeta) => ({
          realizacijaPredmeta: { id: rp.id },
          predmet: { id:this.idPredmeta},
          vidljiv: true
        }))
      };

      this.predmetService.create(novPredmet).subscribe({
        next: () => this.router.navigate(['/predmeti']),
        error: err => console.error('Greška pri čuvanju predmeta:', err)
      });
    }
  }


  private kreirajModel(podaci?: Predmet): FormaModel {
    let selektovaneEvaluacijeZnanja = podaci?.evaluacijeZnanja ?? [];
    let selektovaneRealizacijePredmeta: RealizacijaPredmeta[] = podaci?.realizacijePredmeta?.map(rp => rp.realizacijaPredmeta) ?? [];
    let selektovanaObavestenja = podaci?.obavestenja ?? [];
    let selektovaniDokumentiPredmeta = podaci?.dokumentiPredmeta ?? null;
    let selektovaneGrupeStudenata: GrupaStudenata[] = podaci?.grupeStudenata?.map(gs => gs.grupaStudenata) ?? [];


    return {
      naziv: podaci ? 'Izmena predmeta' : "Dodavanje predmeta",
      polja: [
        ...(podaci ? [{
          naziv: 'id',
          labela: '',
          tip: 'hidden',
          podrazumevanaVrednost: podaci.id
        }] : []),
        {
          naziv: 'naziv',
          labela: 'Naziv',
          tip: 'text',
          podrazumevanaVrednost: podaci?.naziv ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'esbp',
          labela: 'Esbp',
          tip: 'number',
          podrazumevanaVrednost: podaci?.esbp ?? 0,
          validatori: [Validators.required]
        },
        {
          naziv: 'obavezan',
          labela: 'Obavezan',
          tip: 'checkbox',
          podrazumevanaVrednost: podaci?.obavezan ?? false,
          validatori: [Validators.required]
        },
        {
          naziv: 'brojPredavanja',
          labela: 'Broj Predavanja',
          tip: 'number',
          podrazumevanaVrednost: podaci?.brojPredavanja ?? 0,
          validatori: [Validators.required]
        },
        {
          naziv: 'brojVezbi',
          labela: 'Broj Vezbi',
          tip: 'number',
          podrazumevanaVrednost: podaci?.brojVezbi ?? 0,
          validatori: [Validators.required]
        },
        {
          naziv: 'istrazivackiRad',
          labela: 'Istrazivacki Rad',
          tip: 'checkbox',
          podrazumevanaVrednost: podaci?.istrazivackiRad ?? false,
          validatori: [Validators.required]
        },
        {
          naziv: 'brojSemestara',
          labela: 'Broj Semestara',
          tip: 'number',
          podrazumevanaVrednost: podaci?.brojSemestara ?? 0,
          validatori: [Validators.required]
        },
        {
          naziv: 'opis',
          labela: 'Opis',
          tip: 'textarea',
          podrazumevanaVrednost: podaci?.opis ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'cilj',
          labela: 'Cilj',
          tip: 'textarea',
          podrazumevanaVrednost: podaci?.cilj ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'dokumentiPredmeta',
          labela: 'Dokumenti Predmeta',
          tip: 'select',
          podrazumevanaVrednost: selektovaniDokumentiPredmeta,
          opcije: this.sviDokumentiPredmeta,
          displayFn: (d: DokumentiPredmeta) => `${d.silabus} ${d.akreditacija}`,
          //validatori: [Validators.required]
        },
        {
          naziv: 'evaluacijeZnanja',
          labela: 'Evaluacije znanja',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovaneEvaluacijeZnanja,
          opcije: this.sveEvaluacijeZnanja,
          displayFn: (e: EvaluacijaZnanja) => `${e.id}`,
          validatori: [Validators.required]
        },
        {
          naziv: 'grupeStudenata',
          labela: 'Grupe Studenata',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovaneGrupeStudenata,
          opcije: this.sveGrupeStudenata,
          displayFn: (g: GrupaStudenata) => `${g.id}`,
        },
        {
          naziv: 'realizacijePredmeta',
          labela: 'Realizacija Predmeta',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovaneRealizacijePredmeta,
          opcije: this.sveRealizacijePredmeta,
          displayFn: (r: RealizacijaPredmeta) => `${r.nastavnik.ime}  ${r.nastavnik.prezime} ${r.tipNastave.naziv}`,
          validatori: [Validators.required]
        },
        {
          naziv: 'obavestenja',
          labela: 'Obavestenja',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovanaObavestenja,
          opcije: this.svaObavestenja,
          displayFn: (o: Obavestenje) => o.naslov
        },
        {
          naziv: 'vidljiv',
          labela: 'Vidljiv',
          tip: 'checkbox',
          podrazumevanaVrednost: podaci?.vidljiv ?? true,
          validatori: []
        }]
    };
  }
}