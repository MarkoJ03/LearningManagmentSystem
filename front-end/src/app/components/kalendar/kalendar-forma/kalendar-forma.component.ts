import { Component, OnInit } from '@angular/core';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { Kalendar } from '../../../models/Kalendar';
import { KalendarService } from '../../../services/kalendar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentskaSluzba } from '../../../models/StudentskaSluzba';
import { EvaluacijaZnanja } from '../../../models/EvaluacijaZnanja';
import { GrupaStudenata } from '../../../models/GrupaStudenata';
import { TerminNastave } from '../../../models/TerminNastave';
import { StudentskaSluzbaService } from '../../../services/studentska-sluzba.service';
import { EvaluacijaZnanjaService } from '../../../services/evaluacija-znanja.service';
import { GrupaStudenataService } from '../../../services/grupa-studenata.service';
import { TerminNastaveService } from '../../../services/termin-nastave.service';

@Component({
  selector: 'app-kalendar-forma',
  standalone: true,
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './kalendar-forma.component.html',
  styleUrls: ['./kalendar-forma.component.css'],
})
export class KalendarFormaComponent implements OnInit {
  formaModel: FormaModel | null = null;
  idKalendar: number | null = null;

  sveStudentskeSluzbe: StudentskaSluzba[] = [];
  sveEvaluacijeZnanja: EvaluacijaZnanja[] = [];
  sveGrupeStudenata: GrupaStudenata[] = [];
  sviTerminiNastave: TerminNastave[] = [];

  constructor(
    private kalendarService: KalendarService,
    private router: Router,
    private route: ActivatedRoute,

    private studentskaSluzbaService: StudentskaSluzbaService,
    private evaluacijaZnanjaService: EvaluacijaZnanjaService,
    private grupeStudenataService: GrupaStudenataService,
    private terminNastaveService: TerminNastaveService
  ) {}

  ngOnInit(): void {
    this.studentskaSluzbaService.getAll().subscribe((sluzbe) => {
      this.sveStudentskeSluzbe = sluzbe;

      this.evaluacijaZnanjaService.getAll().subscribe((evaluacije) => {
        this.sveEvaluacijeZnanja = evaluacije;

        this.grupeStudenataService.getAll().subscribe((grupe) => {
          this.sveGrupeStudenata = grupe;

          this.terminNastaveService.getAll().subscribe((termini) => {
            this.sviTerminiNastave = termini;

            const idParam = this.route.snapshot.paramMap.get('id');
            if (idParam) {
              this.idKalendar = +idParam;
              this.kalendarService
                .getById(this.idKalendar)
                .subscribe((data) => {
                  this.formaModel = this.kreirajModel(data);
                });
            } else {
              this.formaModel = this.kreirajModel();
            }
          });
        });
      });
    });
  }

  otkazi(): void {
    this.router.navigate(['/kalendari']);
  }

  sacuvaj(vrednosti: any): void {
    if (this.idKalendar) {
      this.kalendarService.update(this.idKalendar, vrednosti).subscribe({
        next: () => this.router.navigate(['/kalendari']),
        error: (err) => console.error('Greška:', err),
      });
    } else {
      this.kalendarService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/kalendari']),
        error: (err) => console.error('Greška:', err),
      });
    }
  }

  private kreirajModel(podaci?: Kalendar): FormaModel {

   

    return {
      naziv: podaci ? 'Izmena kalendara' : 'Dodavanje kalendara',
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
        },{
          naziv: 'studentskaSluzba',
          labela: 'StudentskaSluzba',
          tip: 'select',
          podrazumevanaVrednost: podaci?.studentskaSluzba ?? null,
          opcije: this.sveStudentskeSluzbe,
          displayFn: (s: StudentskaSluzba) =>
            `${s.id}`,
          validatori: [Validators.required]
        },{
          naziv: 'evaluacijaZnanja',
          labela: 'evaluacijaZnanja',
          tip: 'checkbox-list',
          podrazumevanaVrednost: podaci?.evaluacijaZnanja ?? [],
          opcije: this.sveEvaluacijeZnanja,
          displayFn: (s: EvaluacijaZnanja) =>
            s.tipEvaluacije.naziv,
          validatori: [Validators.required]
        },{
          naziv: 'grupaStudenata',
          labela: 'grupaStudenata',
          tip: 'checkbox-list',
          podrazumevanaVrednost: podaci?.grupaStudenata ?? [],
          opcije: this.sveGrupeStudenata,
          displayFn: (s: GrupaStudenata) =>
            `${s.id}`,
          validatori: [Validators.required]
        },
        {
          naziv: 'terminiNastave',
          labela: 'terminiNastave',
          tip: 'checkbox-list',
          podrazumevanaVrednost: podaci?.terminiNastave ?? [],
          opcije: this.sviTerminiNastave,
          displayFn: (s: TerminNastave) =>
            `${s.vremePocetka} ${s.vremeKraja}` ,
          validatori: [Validators.required]
        },
      ],
    };
  }
}
