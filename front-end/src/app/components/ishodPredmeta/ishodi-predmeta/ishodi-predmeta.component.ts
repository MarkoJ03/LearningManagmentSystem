import { Component, OnInit } from '@angular/core';
import { BaseTableComponent } from '../../base-table/base-table.component';
import { Router, RouterLink } from '@angular/router';
import { IshodPredmeta } from '../../../models/IshodPredmeta';
import { IshodPredmetaService } from '../../../services/ishod-predmeta.service';

@Component({
  selector: 'app-ishodi-predmeta',
  standalone: true,
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './ishodi-predmeta.component.html',
  styleUrls: ['./ishodi-predmeta.component.css']
})
export class IshodiPredmetaComponent implements OnInit {
  ishodi: IshodPredmeta[] = [];
  kolone: string[] = ['ocena', 'vidljiv', 'realizacijePredmeta', 'ishodiEvaluacije'];

  constructor(
    private ishodPredmetaService: IshodPredmetaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ishodPredmetaService.getAll().subscribe({
      next: (res) => {
        this.ishodi = res;
      },
      error: (err) => console.error('Greška prilikom učitavanja ishoda predmeta:', err),
    });
  }

  izmeni(ishod: IshodPredmeta): void {
    this.router.navigate(['/ishod-predmeta/izmeni', ishod.id]);
  }

  obrisi(id: number): void {
    this.ishodPredmetaService.delete(id).subscribe(() => {
      this.ishodi = this.ishodi.filter(i => i.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/ishod-predmeta', id]);
  }

  otkazi(): void {
    this.router.navigate(['/ishod-predmeta']);
  }
}
