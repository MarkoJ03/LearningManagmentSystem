import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseTableComponent } from '../../../base-table/base-table.component';
import { TipEvaluacije } from '../../../../models/TipEvaluacije';
import { TipEvaluacijeService } from '../../../../services/tip-evaluacije.service';

@Component({
  selector: 'app-tipovi-evaluacije',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './tipovi-evaluacije.component.html',
  styleUrl: './tipovi-evaluacije.component.css'
})
export class TipoviEvaluacijeComponent {
  tipoviEvaluacije: TipEvaluacije[] = [];
  kolone: string[] = ['naziv', 'vidljiv'];

  constructor(
    private tipEvaluacijeService: TipEvaluacijeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tipEvaluacijeService.getAll().subscribe({
      next: (res) => this.tipoviEvaluacije = res,
      error: (err) => console.error('Greška prilikom učitavanja tipova evaluacije:', err),
    });
  }

  izmeni(tipEvaluacije: TipEvaluacije): void {
    this.router.navigate(['/tipovi-evaluacije/forma', tipEvaluacije.id]);
  }

  obrisi(id: number): void {
    this.tipEvaluacijeService.delete(id).subscribe(() => {
      this.tipoviEvaluacije = this.tipoviEvaluacije.filter(a => a.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/tipovi-evaluacije', id]);
  }

  otkazi(): void {
    this.router.navigate(['/tipovi-evaluacije']);
  }
}
