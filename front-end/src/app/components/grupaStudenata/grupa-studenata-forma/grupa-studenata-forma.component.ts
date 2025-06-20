import { Component } from '@angular/core';
import { GrupaStudenata } from '../../../models/GrupaStudenata';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { KalendarService } from '../../../services/kalendar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupaStudenataService } from '../../../services/grupa-studenata.service';
import { Kalendar } from '../../../models/Kalendar';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { StudentNaGodini } from '../../../models/StudentNaGodini';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';
import { Predmet } from '../../../models/Predmet';
import { GrupaStudenataPredmetService } from '../../../services/grupa-studenata-predmet.service';
import { PredmetService } from '../../../services/predmet.service';

@Component({
  selector: 'app-grupa-studenata-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './grupa-studenata-forma.component.html',
  styleUrl: './grupa-studenata-forma.component.css',
})
export class GrupaStudenataFormaComponent {
  formaModel: FormaModel | null = null;
  idGrupe: number | null = null;
  sviKalendari: Kalendar[] = [];
  sviStudentiNaGodini: StudentNaGodini[] = [];
  kreiraniGrupa: GrupaStudenata | null = null;
  sviPredmeti: Predmet[] = [];

  constructor(
    private grupaStudenataService: GrupaStudenataService,
    private kalendarService: KalendarService,
    private router: Router,
    private route: ActivatedRoute,
    private studentNaGodiniService: StudentNaGodiniService,
    private grupaStudenataPredmetService: GrupaStudenataPredmetService,
    private predmetService: PredmetService
  ) {}

  ngOnInit(): void {
    this.predmetService.getAll().subscribe((predmeti) => {
      this.sviPredmeti = predmeti;

      this.studentNaGodiniService.getAll().subscribe((studentiNaGodini) => {
        this.sviStudentiNaGodini = studentiNaGodini;

        this.kalendarService.getAll().subscribe((kalendari) => {
          this.sviKalendari = kalendari;

          const idParam = this.route.snapshot.paramMap.get('id');
          if (idParam) {
            this.idGrupe = +idParam;
            this.grupaStudenataService
              .getById(this.idGrupe)
              .subscribe((grupa) => {
                this.formaModel = this.kreirajModel(grupa);
              });
          } else {
            this.formaModel = this.kreirajModel();
          }
        });
      });
    });
  }

  otkazi(): void {
    this.router.navigate(['/grupeStudenata']);
  }

  sacuvajGrupu(vrednosti: any): void {
    console.log('Payload pre prilagodbe:', vrednosti);

    vrednosti.vidljiv =
      vrednosti.vidljiv === true || vrednosti.vidljiv === 'true';

    vrednosti.kalendar = { id: vrednosti.kalendar?.id ?? null };

    console.log('Payload za backend:', JSON.stringify(vrednosti, null, 2));

    const izmenjeGrupaStudenata = {
      ...vrednosti,

       predmeti: vrednosti.predmeti.map((gs: Predmet) => ({
          predmet: { id: gs.id },
          grupaStudenata: { id:this.idGrupe},
          vidljiv: true
        })),

      studentiNaGodini: vrednosti.studentiNaGodini?.map(
        (sp: StudentNaGodini) => ({
          id: sp.id,
        })
      ),
    };

    if (this.idGrupe) {
      this.grupaStudenataService
        .update(this.idGrupe, izmenjeGrupaStudenata)
        .subscribe({
          next: () => this.router.navigate(['/grupeStudenata']),
          error: (err) =>
            console.error('Greška prilikom ažuriranja grupe:', err),
        });
    } else {
      const izmenjeGrupaStudenata = {
      ...vrednosti,

       predmeti: vrednosti.predmeti.map((gs: Predmet) => ({
          predmet: { id: gs.id },
          grupaStudenata: { id:this.idGrupe},
          vidljiv: true
        })),

      studentNaGodini: vrednosti.studentNaGodini?.map(
        (sp: StudentNaGodini) => ({
          id: sp.id,
        })
      ),
    };

      this.grupaStudenataService.create(izmenjeGrupaStudenata).subscribe({
        next: () => this.router.navigate(['/grupeStudenata']),
        error: (err) => console.error('Greška pri čuvanju grupe:', err),
      });
    }
  }

  private kreirajModel(podaci?: GrupaStudenata): FormaModel {

 let selektovaniPredmeti: Predmet[] = podaci?.predmeti?.map(gs => gs.predmet) ?? [];

    return {
      naziv: podaci ? 'Izmena grupe studenata' : 'Dodavanje grupe studenata',
      polja: [
        ...(podaci
          ? [
              {
                naziv: 'id',
                labela: '',
                tip: 'hidden',
                podrazumevanaVrednost: podaci.id,
              },
            ]
          : []),
        {
          naziv: 'vidljiv',
          labela: 'Vidljiv',
          tip: 'checkbox',
          podrazumevanaVrednost: podaci?.vidljiv ?? true,
        },
        {
          naziv: 'kalendar',
          labela: 'Kalendar',
          tip: 'select',
          podrazumevanaVrednost: podaci?.kalendar ?? null,
          opcije: this.sviKalendari,
          displayFn: (k: Kalendar) => `${k.id}`,
          validatori: [Validators.required],
        },
        {
          naziv: 'studentiNaGodini',
          labela: 'studentiNaGodini',
          tip: 'checkbox-list',
          podrazumevanaVrednost: podaci?.studentiNaGodini ?? [],
          opcije: this.sviStudentiNaGodini,
          displayFn: (k: StudentNaGodini) => `${k.id}`,
          validatori: [Validators.required],
        },{
          naziv: 'predmeti',
          labela: 'predmeti',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovaniPredmeti,
          opcije: this.sviPredmeti,
          displayFn: (g: Predmet) => g.naziv,
        }
      ],
    };
  }
}
