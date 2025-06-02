import { Component } from '@angular/core';
import { GenerickaFormaComponent } from '../../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../../genericka-forma/FormaModel';
import { TipZvanjaService } from '../../../../services/tip-zvanja.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tip-zvanja-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './tip-zvanja-forma.component.html',
  styleUrl: './tip-zvanja-forma.component.css'
})
export class TipZvanjaFormaComponent {
  formaModel: FormaModel | null = null;
  idTipaZvanja: number | null = null;

  constructor(
    private tipZvanjaService: TipZvanjaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idTipaZvanja = +idParam;
      this.tipZvanjaService.getById(this.idTipaZvanja).subscribe(tipZvanja => {
        this.formaModel = this.kreirajModel(tipZvanja);
      });
    } else {
      this.formaModel = this.kreirajModel();
    }
  }

  otkazi(): void {
    this.router.navigate(['/tipovi-zvanja']);
  }

  public sacuvajTipZvanja(vrednosti: any): void {
    if (this.idTipaZvanja) {
      this.tipZvanjaService.update(this.idTipaZvanja, vrednosti).subscribe({
        next: () => this.router.navigate(['/tipovi-zvanja']),
        error: err => console.error('Greška pri izmeni tipa zvanja:', err)
      });
    } else {
      this.tipZvanjaService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/tipovi-zvanja']),
        error: err => console.error('Greška pri čuvanju tipa zvanja:', err)
      });
    }
  }

  private kreirajModel(podaci?: any): FormaModel {
    return {
      naziv: podaci ? 'Izmena tipa zvanja' : 'Dodavanje tipa zvanja',
      polja: [
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
