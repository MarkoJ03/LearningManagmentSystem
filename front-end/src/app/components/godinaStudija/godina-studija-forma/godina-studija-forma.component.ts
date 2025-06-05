import { Component, OnInit } from '@angular/core';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { GodinaStudija } from '../../../models/GodinaStudija';
import { GodinaStudijaService } from '../../../services/godina-studija.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudijskiProgram } from '../../../models/StudijskiProgram';
import { StudijskiProgramService } from '../../../services/studijski-program.service';

@Component({
  selector: 'app-godina-studija-forma',
  standalone: true,
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './godina-studija-forma.component.html',
  styleUrls: ['./godina-studija-forma.component.css']
})
export class GodinaStudijaFormaComponent implements OnInit {
  formaModel: FormaModel | null = null;
  idGodinaStudija: number | null = null;
  studijskiProgrami: StudijskiProgram[] = [];

  constructor(
    private service: GodinaStudijaService,
    private studijskiProgramService: StudijskiProgramService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.studijskiProgramService.getAll().subscribe(programi => {
      this.studijskiProgrami = programi;

      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        this.idGodinaStudija = +idParam;
        this.service.getById(this.idGodinaStudija).subscribe(data => {
          this.formaModel = this.kreirajModel(data);
        });
      } else {
        this.formaModel = this.kreirajModel();
      }
    });
  }

  otkazi(): void {
    this.router.navigate(['/godine-studija']);
  }

  sacuvaj(vrednosti: any): void {
    if (this.idGodinaStudija) {
      this.service.update(this.idGodinaStudija, vrednosti).subscribe({
        next: () => this.router.navigate(['/godine-studija']),
        error: err => console.error('Greška:', err)
      });
    } else {
      this.service.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/godine-studija']),
        error: err => console.error('Greška:', err)
      });
    }
  }

  private kreirajModel(podaci?: GodinaStudija): FormaModel {
    return {
      naziv: podaci ? 'Izmena godine studija' : 'Dodavanje godine studija',
      polja: [
        ...(podaci ? [{
          naziv: 'id',
          labela: '',
          tip: 'hidden',
          podrazumevanaVrednost: podaci.id
        }] : []),
        {
          naziv: 'godina',
          labela: 'Godina',
          tip: 'text',
          podrazumevanaVrednost: podaci?.godina ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'vidljiv',
          labela: 'Vidljiv',
          tip: 'checkbox',
          podrazumevanaVrednost: podaci?.vidljiv ?? true
        },
        {
          naziv: 'studijskiProgram',
          labela: 'Studijski program',
          tip: 'select',
          podrazumevanaVrednost: podaci?.studijskiProgram ?? null,
          opcije: this.studijskiProgrami,
          displayFn: (p: StudijskiProgram) => p.naziv,
          validatori: [Validators.required]
        }
      ]
    };
  }
}
