import { Component, OnInit } from '@angular/core';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { TipPrograma } from '../../../models/TipPrograma';
import { TipProgramaService } from '../../../services/tip-programa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Katedra } from '../../../models/Katedra';
import { StudijskiProgram } from '../../../models/StudijskiProgram';
import { KatedraService } from '../../../services/katedra.service';
import { StudijskiProgramService } from '../../../services/studijski-program.service';

@Component({
  selector: 'app-tip-programa-forma',
  standalone: true,
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './tip-programa-forma.component.html',
  styleUrls: ['./tip-programa-forma.component.css'],
})
export class TipProgramaFormaComponent implements OnInit {
  formaModel: FormaModel | null = null;
  idTipPrograma: number | null = null;

  sveKatedre: Katedra[] = [];
  sviStudijskiProgrami: StudijskiProgram[] = [];

  constructor(
    private tipProgramaService: TipProgramaService,
    private router: Router,
    private route: ActivatedRoute,

    private katedraService: KatedraService,
    private studijskiProgramiService: StudijskiProgramService
  ) {}

  ngOnInit(): void {
    

      this.studijskiProgramiService.getAll().subscribe((programi) => {
        this.sviStudijskiProgrami = programi;

        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
          this.idTipPrograma = +idParam;
          this.tipProgramaService
            .getById(this.idTipPrograma)
            .subscribe((data) => {
              this.formaModel = this.kreirajModel(data);
            });
        } else {
          this.formaModel = this.kreirajModel();
        }
      });
    
  }

  otkazi(): void {
    this.router.navigate(['/tipovi-programa']);
  }

  sacuvaj(vrednosti: any): void {
    if (this.idTipPrograma) {
      this.tipProgramaService.update(this.idTipPrograma, vrednosti).subscribe({
        next: () => this.router.navigate(['/tipovi-programa']),
        error: (err) => console.error('Greška:', err),
      });
    } else {
      this.tipProgramaService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/tipovi-programa']),
        error: (err) => console.error('Greška:', err),
      });
    }
  }

  private kreirajModel(podaci?: TipPrograma): FormaModel {
    return {
      naziv: podaci ? 'Izmena tipa programa' : 'Dodavanje tipa programa',
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
          naziv: 'naziv',
          labela: 'Naziv',
          tip: 'text',
          podrazumevanaVrednost: podaci?.naziv ?? '',
          validatori: [Validators.required],
        },
        {
          naziv: 'vidljiv',
          labela: 'Vidljiv',
          tip: 'checkbox',
          podrazumevanaVrednost: podaci?.vidljiv ?? true,
        },
        {
          naziv: 'programi',
          labela: 'programi',
          tip: 'checkbox-list',
          podrazumevanaVrednost: podaci?.programi ?? [],
          opcije: this.sviStudijskiProgrami, 
          displayFn: (s: StudijskiProgram) => s.naziv,
          validatori: [Validators.required],
        }
        
      ],
    };
  }
}
