import { Component, OnInit } from '@angular/core';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { TipPrograma } from '../../../models/TipPrograma';
import { TipProgramaService } from '../../../services/tip-programa.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tip-programa-forma',
  standalone: true,
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './tip-programa-forma.component.html',
  styleUrls: ['./tip-programa-forma.component.css']
})
export class TipProgramaFormaComponent implements OnInit {
  formaModel: FormaModel | null = null;
  idTipPrograma: number | null = null;

  constructor(
    private tipProgramaService: TipProgramaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idTipPrograma = +idParam;
      this.tipProgramaService.getById(this.idTipPrograma).subscribe(data => {
        this.formaModel = this.kreirajModel(data);
      });
    } else {
      this.formaModel = this.kreirajModel();
    }
  }

  otkazi(): void {
    this.router.navigate(['/tip-programa']);
  }

  sacuvaj(vrednosti: any): void {
    if (this.idTipPrograma) {
      this.tipProgramaService.update(this.idTipPrograma, vrednosti).subscribe({
        next: () => this.router.navigate(['/tip-programa']),
        error: err => console.error('Greška:', err)
      });
    } else {
      this.tipProgramaService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/tip-programa']),
        error: err => console.error('Greška:', err)
      });
    }
  }

  private kreirajModel(podaci?: TipPrograma): FormaModel {
    return {
      naziv: podaci ? 'Izmena tipa programa' : 'Dodavanje tipa programa',
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
          naziv: 'vidljiv',
          labela: 'Vidljiv',
          tip: 'checkbox',
          podrazumevanaVrednost: podaci?.vidljiv ?? true
        }
      ]
    };
  }
}
