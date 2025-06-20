import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../../genericka-forma/FormaModel';
import { ActivatedRoute, Router } from '@angular/router';
import { GenerickaFormaComponent } from '../../../genericka-forma/genericka-forma.component';
import { TipEvaluacijeService } from '../../../../services/tip-evaluacije.service';

@Component({
  selector: 'app-tip-evaluacije-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './tip-evaluacije-forma.component.html',
  styleUrl: './tip-evaluacije-forma.component.css'
})
export class TipEvaluacijeFormaComponent {
  formaModel: FormaModel | null = null;
  idTipaEvaluacije: number | null = null;

  constructor(
    private tipEvaluacijeService: TipEvaluacijeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idTipaEvaluacije = +idParam;
      this.tipEvaluacijeService.getById(this.idTipaEvaluacije).subscribe(tipEvaluacije => {
        this.formaModel = this.kreirajModel(tipEvaluacije);
      });
    } else {
      this.formaModel = this.kreirajModel();
    }
  }

  otkazi(): void {
    this.router.navigate(['/tipovi-evaluacije']);
  }

  public sacuvajTipEvaluacije(vrednosti: any): void {
    if (this.idTipaEvaluacije) {
      this.tipEvaluacijeService.update(this.idTipaEvaluacije, vrednosti).subscribe({
        next: () => this.router.navigate(['/tipovi-evaluacije']),
        error: err => console.error('Greška pri izmeni tipa evaluacije:', err)
      });
    } else {
      this.tipEvaluacijeService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/tipovi-evaluacije']),
        error: err => console.error('Greška pri čuvanju tipa evaluacije:', err)
      });
    }
  }

  private kreirajModel(podaci?: any): FormaModel {
    return {
      naziv: podaci ? 'Izmena tipa evaluacije' : 'Dodavanje tipa evaluacije',
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
        },{
          naziv: 'vidljiv',
          labela: 'Vidljiv',
          tip: 'checkbox',
          podrazumevanaVrednost: podaci?.vidljiv ?? true,
          validatori: []
        }
      ]
    };
  }
}
