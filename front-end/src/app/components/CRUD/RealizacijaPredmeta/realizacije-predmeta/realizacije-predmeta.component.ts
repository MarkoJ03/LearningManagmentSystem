import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseTableComponent } from '../../../base-table/base-table.component';
import { RealizacijaPredmeta } from '../../../../models/RealizacijaPredmeta';
import { RealizacijaPredmetaService } from '../../../../services/realizacija-predmeta.service';

@Component({
  selector: 'app-realizacije-predmeta',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './realizacije-predmeta.component.html',
  styleUrl: './realizacije-predmeta.component.css'
})
export class RealizacijePredmetaComponent {
  realizacijePredmeta: RealizacijaPredmeta[] = [];
  kolone: string[] = ['nastavnik', 'tipNastave', 'predmet', 'terminiNastave', 'vidljiv'];

  constructor(
    private realizacijaPredmetaService: RealizacijaPredmetaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.realizacijaPredmetaService.getAll().subscribe({
      next: (res) => this.realizacijePredmeta = res,
      error: (err) => console.error('Greška prilikom učitavanja realizacija premeta:', err),
    });
  }

  izmeni(realizacijaPredmeta: RealizacijaPredmeta): void {
    this.router.navigate(['/realizacije-predmeta/forma', realizacijaPredmeta.id]);
  }

  obrisi(id: number): void {
    this.realizacijaPredmetaService.delete(id).subscribe(() => {
      this.realizacijePredmeta = this.realizacijePredmeta.filter(v => v.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/realizacije-predmeta', id]);
  }

  otkazi(): void {
    this.router.navigate(['/realizacije-predmeta']);
  }
}
