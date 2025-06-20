import { Component, OnInit } from '@angular/core';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { StudentskaSluzba } from '../../../models/StudentskaSluzba';
import { StudentskaSluzbaService } from '../../../services/studentska-sluzba.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventar } from '../../../models/Inventar';
import { Biblioteka } from '../../../models/Biblioteka';
import { Kalendar } from '../../../models/Kalendar';
import { Student } from '../../../models/Student';
import { SvObrazac } from '../../../models/SvObrazac';
import { Objava } from '../../../models/Objava';
import { InventarService } from '../../../services/inventar.service';
import { BibliotekaService } from '../../../services/biblioteka.service';
import { KalendarService } from '../../../services/kalendar.service';
import { StudentService } from '../../../services/student.service';
import { SvObrazacService } from '../../../services/sv-obrazac.service';
import { ObjavaService } from '../../../services/objava.service';

@Component({
  selector: 'app-studentska-sluzba-forma',
  standalone: true,
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './studentska-sluzba-forma.component.html',
  styleUrls: ['./studentska-sluzba-forma.component.css'],
})
export class StudentskaSluzbaFormaComponent implements OnInit {
  formaModel: FormaModel | null = null;
  idSluzba: number | null = null;

  sviInventari: Inventar[] = [];
  sveBiblioteke: Biblioteka[] = [];
  sviKalendari: Kalendar[] = [];
  sviStudenti: Student[] = [];
  sviObrazci: SvObrazac[] = [];
  sveObjave: Objava[] = [];

  constructor(
    private sluzbaService: StudentskaSluzbaService,
    private router: Router,
    private route: ActivatedRoute,

    private inventarService: InventarService,
    private bibliotekaService: BibliotekaService,
    private kalendarService: KalendarService,
    private studentService: StudentService,
    private svObrazacService: SvObrazacService,
    private objaveService: ObjavaService
  ) {}

  ngOnInit(): void {
    this.inventarService.getAll().subscribe((inventar) => {
      this.sviInventari = inventar;

      this.bibliotekaService.getAll().subscribe((biblioteka) => {
        this.sveBiblioteke = biblioteka;

        this.kalendarService.getAll().subscribe((kalendar) => {
          this.sviKalendari = kalendar;

          this.studentService.getAll().subscribe((student) => {
            this.sviStudenti = student;

            this.svObrazacService.getAll().subscribe((sv) => {
              this.sviObrazci = sv;

              this.objaveService.getAll().subscribe((objava) => {
                this.sveObjave = objava;

                const idParam = this.route.snapshot.paramMap.get('id');
                if (idParam) {
                  this.idSluzba = +idParam;
                  this.sluzbaService
                    .getById(this.idSluzba)
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
      });
    });
  }

  otkazi(): void {
    this.router.navigate(['/studentske-sluzbe']);
  }

  sacuvaj(vrednosti: any): void {
    if (this.idSluzba) {
      this.sluzbaService.update(this.idSluzba, vrednosti).subscribe({
        next: () => this.router.navigate(['/studentske-sluzbe']),
        error: (err) => console.error('Greška:', err),
      });
    } else {
      this.sluzbaService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/studentske-sluzbe']),
        error: (err) => console.error('Greška:', err),
      });
    }
  }

  private kreirajModel(podaci?: StudentskaSluzba): FormaModel {
    return {
      naziv: podaci
        ? 'Izmena studentske službe'
        : 'Dodavanje studentske službe',
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
          naziv: 'objave',
          labela: 'Objave',
          tip: 'checkbox-list',
          podrazumevanaVrednost: podaci?.objave ?? [],
          opcije: this.sveObjave,
          displayFn: (o: Objava )=> o.naslov,
          validatori: [Validators.required]
        },
        {
          naziv: 'inventari',
          labela: 'Inventari',
          tip: 'checkbox-list',
          podrazumevanaVrednost: podaci?.inventari ?? [],
          opcije: this.sviInventari,
          displayFn: (o: Inventar )=> `${o.id}`,
          validatori: [Validators.required]
        },
        {
          naziv: 'biblioteka',
          labela: 'Biblioteka',
          tip: 'select',
          podrazumevanaVrednost: podaci?.biblioteka ?? [],
          opcije: this.sveBiblioteke,
          displayFn: (o: Biblioteka )=> `${o.id}`,
        },
        {
          naziv: 'kalendari',
          labela: 'Kalendari',
          tip: 'checkbox-list',
          podrazumevanaVrednost: podaci?.kalendari ?? [],
          opcije: this.sviKalendari,
          displayFn: (o: Kalendar )=> `${o.id}`,
          validatori: [Validators.required]
        },
        {
          naziv: 'studenti',
          labela: 'Studenti',
          tip: 'checkbox-list',
          podrazumevanaVrednost: podaci?.studenti ?? [],
          opcije: this.sviStudenti,
          displayFn: (o: Student )=> `${o.ime } ${o.prezime}` ,
          validatori: [Validators.required]
        },
        {
          naziv: 'obrasci',
          labela: 'Obrasci',
          tip: 'checkbox-list',
          podrazumevanaVrednost: podaci?.obrasci ?? [],
           opcije: this.sviObrazci,
          displayFn: (o: SvObrazac )=> `${o.id}`,
          validatori: [Validators.required]

        },
      ],
    };
  }
}
