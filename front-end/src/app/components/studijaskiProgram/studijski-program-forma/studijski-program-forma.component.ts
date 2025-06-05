import { Component, OnInit } from '@angular/core';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { StudijskiProgram } from '../../../models/StudijskiProgram';
import { StudijskiProgramService } from '../../../services/studijski-program.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Katedra } from '../../../models/Katedra';
import { TipPrograma } from '../../../models/TipPrograma';
import { TipProgramaService } from '../../../services/tip-programa.service';
import { KatedraService } from '../../../services/katedra.service';

@Component({
  selector: 'app-studijski-program-forma',
  standalone: true,
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './studijski-program-forma.component.html',
  styleUrls: ['./studijski-program-forma.component.css']
})
export class StudijskiProgramFormaComponent implements OnInit {
  formaModel: FormaModel | null = null;
  idStudijskiProgram: number | null = null;

  tipoviPrograma: TipPrograma[] = [];
  katedre: Katedra[] = [];

  constructor(
    private studijskiProgramService: StudijskiProgramService,
    private tipProgramaService: TipProgramaService,
    private katedraService: KatedraService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tipProgramaService.getAll().subscribe(tipovi => {
      this.tipoviPrograma = tipovi;

      this.katedraService.getAll().subscribe(katedre => {
        this.katedre = katedre;

        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
          this.idStudijskiProgram = +idParam;
          this.studijskiProgramService.getById(this.idStudijskiProgram).subscribe(data => {
            this.formaModel = this.kreirajModel(data);
          });
        } else {
          this.formaModel = this.kreirajModel();
        }
      });
    });
  }

  otkazi(): void {
    this.router.navigate(['/studijski-programi']);
  }

  sacuvaj(vrednosti: any): void {
    if (this.idStudijskiProgram) {
      this.studijskiProgramService.update(this.idStudijskiProgram, vrednosti).subscribe({
        next: () => this.router.navigate(['/studijski-programi']),
        error: err => console.error('Greška prilikom ažuriranja programa:', err)
      });
    } else {
      this.studijskiProgramService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/studijski-programi']),
        error: err => console.error('Greška prilikom kreiranja programa:', err)
      });
    }
  }

  private kreirajModel(podaci?: StudijskiProgram): FormaModel {
    return {
      naziv: podaci ? 'Izmena programa' : 'Dodavanje programa',
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
          naziv: 'tipPrograma',
          labela: 'Tip programa',
          tip: 'select',
          podrazumevanaVrednost: podaci?.tipPrograma ?? null,
          opcije: this.tipoviPrograma,
          displayFn: (t: TipPrograma) => t.naziv,
          validatori: [Validators.required]
        },
        {
          naziv: 'katedra',
          labela: 'Katedra',
          tip: 'select',
          podrazumevanaVrednost: podaci?.katedra ?? null,
          opcije: this.katedre,
          displayFn: (k: Katedra) => k.naziv,
          validatori: [Validators.required]
        },
        {
          naziv: 'vidljiv',
          labela: 'Vidljiv',
          tip: 'checkbox',
          podrazumevanaVrednost: podaci?.vidljiv ?? true
        }
      ]
    };
  }

}
