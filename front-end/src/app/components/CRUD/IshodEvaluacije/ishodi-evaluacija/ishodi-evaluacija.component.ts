import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseTableComponent } from '../../../base-table/base-table.component';
import { IshodEvaluacije } from '../../../../models/IshodEvaluacije';
import { IshodEvaluacijeService } from '../../../../services/ishod-evaluacije.service';

@Component({
  selector: 'app-ishodi-evaluacija',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './ishodi-evaluacija.component.html',
  styleUrl: './ishodi-evaluacija.component.css'
})
export class IshodiEvaluacijaComponent {
  ishodiEvaluacija: IshodEvaluacije[] = [];
  kolone: string[] = ['bodovi', 'napomena', 'studentNaGodini', 'evaluacijaZnanja', 'ishodPredmeta', 'vidljiv'];

  constructor(
    private ishodEvaluacijeService: IshodEvaluacijeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ishodEvaluacijeService.getAll().subscribe({
      next: (res) => this.ishodiEvaluacija = res,
      error: (err) => console.error('Greška prilikom učitavanja ishoda evaluacija:', err),
    });
  }

  izmeni(ishodEvaluacije: IshodEvaluacije): void {
    this.router.navigate(['/ishodi-evaluacija/forma', ishodEvaluacije.id]);
  }

  obrisi(id: number): void {
    this.ishodEvaluacijeService.delete(id).subscribe(() => {
      this.ishodiEvaluacija = this.ishodiEvaluacija.filter(a => a.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/ishodi-evaluacija', id]);
  }

  otkazi(): void {
    this.router.navigate(['/ishodi-evaluacija']);
  }
}
