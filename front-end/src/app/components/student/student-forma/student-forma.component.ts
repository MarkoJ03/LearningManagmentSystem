import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { Student } from '../../../models/Student';
import { StudentService } from '../../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdresaService } from '../../../services/adresa.service';
import { StudentskaSluzbaService } from '../../../services/studentska-sluzba.service';
import { KorisnikService } from '../../../services/korisnik.service';
import { Adresa } from '../../../models/Adresa';
import { StudentskaSluzba } from '../../../models/StudentskaSluzba';
import { Korisnik } from '../../../models/Korisnik';

@Component({
  selector: 'app-student-forma',
  standalone: true,
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './student-forma.component.html',
  styleUrls: ['./student-forma.component.css']
})
export class StudentFormaComponent implements OnInit {
  formaModel: FormaModel | null = null;
  idStudent: number | null = null;

  sveAdrese: Adresa[] = [];
  sveSluzbe: StudentskaSluzba[] = [];
  sviKorisnici: Korisnik[] = [];

  constructor(
    private studentService: StudentService,
    private adresaService: AdresaService,
    private studentskaSluzbaService: StudentskaSluzbaService,
    private korisnikService: KorisnikService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.adresaService.getAll().subscribe(adrese => {
      this.sveAdrese = adrese;

      this.studentskaSluzbaService.getAll().subscribe(sluzbe => {
        this.sveSluzbe = sluzbe;

        this.korisnikService.getAll().subscribe(korisnici => {
          this.sviKorisnici = korisnici;

          const idParam = this.route.snapshot.paramMap.get('id');
          if (idParam) {
            this.idStudent = +idParam;
            this.studentService.getById(this.idStudent).subscribe(student => {
              this.formaModel = this.kreirajModel(student);
            });
          } else {
            this.formaModel = this.kreirajModel();
          }
        });
      });
    });
  }

  otkazi(): void {
    this.router.navigate(['/studenti']);
  }

  sacuvaj(vrednosti: any): void {
    console.log('Čuvanje studenta:', vrednosti);

    if (this.idStudent) {
      this.studentService.update(this.idStudent, vrednosti).subscribe({
        next: () => this.router.navigate(['/studenti']),
        error: err => console.error('Greška prilikom ažuriranja:', err)
      });
    } else {
      this.studentService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/studenti']),
        error: err => console.error('Greška prilikom kreiranja:', err)
      });
    }
  }

  private kreirajModel(podaci?: Student): FormaModel {
    return {
      naziv: podaci ? 'Izmena studenta' : 'Dodavanje studenta',
      polja: [
        ...(podaci ? [{
          naziv: 'id',
          labela: '',
          tip: 'hidden',
          podrazumevanaVrednost: podaci.id
        }] : []),
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
          labela: 'JMBG',
          tip: 'text',
          podrazumevanaVrednost: podaci?.jmbg ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'vidljiv',
          labela: 'Vidljiv',
          tip: 'checkbox',
          podrazumevanaVrednost: podaci?.vidljiv ?? true
        },
        {
          naziv: 'adresa',
          labela: 'Adresa',
          tip: 'select',
          podrazumevanaVrednost: podaci?.adresa ?? null,
          opcije: this.sveAdrese,
          displayFn: (a: Adresa) => `${a.ulica} ${a.broj}`,
          validatori: [Validators.required]
        },
        {
          naziv: 'studentskaSluzba',
          labela: 'Studentska služba',
          tip: 'select',
          podrazumevanaVrednost: podaci?.studentskaSluzba ?? null,
          opcije: this.sveSluzbe,
          displayFn: (s: StudentskaSluzba) => `${s.id}`,
          validatori: [Validators.required]
        },
        {
          naziv: 'korisnik',
          labela: 'Korisnik',
          tip: 'select',
          podrazumevanaVrednost: podaci?.korisnik ?? null,
          opcije: this.sviKorisnici,
          displayFn: (k: Korisnik) => `${k.id}`,
          validatori: [Validators.required]
        }
      ]
    };
  }
}
