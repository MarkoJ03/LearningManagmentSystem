import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseTableComponent } from '../../../base-table/base-table.component';
import { Zvanje } from '../../../../models/Zvanje';
import { ZvanjeService } from '../../../../services/zvanje.service';

@Component({
  selector: 'app-zvanja',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './zvanja.component.html',
  styleUrl: './zvanja.component.css'
})
export class ZvanjaComponent {
  zvanja: Zvanje[] = [];
  kolone: string[] = ['datumIzbora', 'datumPrestanka', 'tipZvanja', 'naucnaOblast', 'nastavnik', 'vidljiv'];

  constructor(
    private zvanjeService: ZvanjeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.zvanjeService.getAll().subscribe({
      next: (res) => this.zvanja = res,
      error: (err) => console.error('Greška prilikom učitavanja zvanja:', err),
    });
  }

  izmeni(zvanje: Zvanje): void {
    this.router.navigate(['/zvanja/forma', zvanje.id]);
  }

  obrisi(id: number): void {
    this.zvanjeService.delete(id).subscribe(() => {
      this.zvanja = this.zvanja.filter(a => a.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/zvanja', id]);
  }

  otkazi(): void {
    this.router.navigate(['/zvanja']);
  }
}
