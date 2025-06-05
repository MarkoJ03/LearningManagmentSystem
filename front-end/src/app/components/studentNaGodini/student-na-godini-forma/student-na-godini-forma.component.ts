import { Component, OnInit } from '@angular/core';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { StudentNaGodini } from '../../../models/StudentNaGodini';

import { StudentNaGodiniService } from '../../../services/student-na-godini.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GodinaStudija } from '../../../models/GodinaStudija';
import { GrupaStudenata } from '../../../models/GrupaStudenata';
import { GodinaStudijaService } from '../../../services/godina-studija.service';
import { GrupaStudenataService } from '../../../services/grupa-studenata.service';

@Component({
  selector: 'app-student-na-godini-forma',
  standalone: true,
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './student-na-godini-forma.component.html',
  styleUrls: ['./student-na-godini-forma.component.css']
})
export class StudentNaGodiniFormaComponent implements OnInit {
  formaModel: FormaModel | null = null;
  idStudentNaGodini: number | null = null;
  sveGodineStudija: GodinaStudija[] = [];
  sveGrupeStudenata: GrupaStudenata[] = [];

  constructor(
    private studentNaGodiniService: StudentNaGodiniService,
    private godinaStudijaService: GodinaStudijaService,
    private grupaStudenataService: GrupaStudenataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.godinaStudijaService.getAll().subscribe(godineStudija => {
      this.sveGodineStudija = godineStudija;

      this.grupaStudenataService.getAll().subscribe(grupeStudenata => {
        this.sveGrupeStudenata = grupeStudenata;

        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
          this.idStudentNaGodini = +idParam;
          this.studentNaGodiniService.getById(this.idStudentNaGodini).subscribe(data => {
            this.formaModel = this.kreirajModel(data);
          });
        } else {
          this.formaModel = this.kreirajModel();
        }
      });
    });
  }

  otkazi(): void {
    this.router.navigate(['/student-na-godini']);
  }

  sacuvaj(vrednosti: any): void {
    if (this.idStudentNaGodini) {
      this.studentNaGodiniService.update(this.idStudentNaGodini, vrednosti).subscribe({
        next: () => this.router.navigate(['/student-na-godini']),
        error: err => console.error('Greška:', err)
      });
    } else {
      this.studentNaGodiniService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/student-na-godini']),
        error: err => console.error('Greška:', err)
      });
    }
  }

  private kreirajModel(podaci?: StudentNaGodini): FormaModel {
    return {
      naziv: podaci ? 'Izmena studenta na godini' : 'Dodavanje studenta na godini',
      polja: [
        ...(podaci ? [{
          naziv: 'id',
          labela: '',
          tip: 'hidden',
          podrazumevanaVrednost: podaci.id
        }] : []),
        {
          naziv: 'brojIndeksa',
          labela: 'Broj indeksa',
          tip: 'text',
          podrazumevanaVrednost: podaci?.brojIndeksa ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'datumUpisa',
          labela: 'Datum upisa',
          tip: 'date',
          podrazumevanaVrednost: podaci?.datumUpisa ?? null
        },
        {
          naziv: 'vidljiv',
          labela: 'Vidljiv',
          tip: 'checkbox',
          podrazumevanaVrednost: podaci?.vidljiv ?? true
        },
        {
          naziv: 'godinaStudija',
          labela: 'Godina studija',
          tip: 'select',
          podrazumevanaVrednost: podaci?.godinaStudija ?? null,
          opcije: this.sveGodineStudija,
          displayFn: (g: GodinaStudija) => `${g.id}`
        },
        {
          naziv: 'grupaStudenata',
          labela: 'Grupa studenata',
          tip: 'select',
          podrazumevanaVrednost: podaci?.grupaStudenata ?? null,
          opcije: this.sveGrupeStudenata,
          displayFn: (g: GrupaStudenata) => `${g.id}`
        }
      ]
    };
  }
}
