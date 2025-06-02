import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseTableComponent } from '../../../base-table/base-table.component';
import { TipZvanja } from '../../../../models/TipZvanja';
import { TipZvanjaService } from '../../../../services/tip-zvanja.service';

@Component({
  selector: 'app-tipovi-zvanja',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './tipovi-zvanja.component.html',
  styleUrl: './tipovi-zvanja.component.css'
})
export class TipoviZvanjaComponent {
  tipoviZvanja: TipZvanja[] = [];
  kolone: string[] = ['naziv', 'vidljiv'];

  constructor(
    private tipZvanjaService: TipZvanjaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tipZvanjaService.getAll().subscribe({
      next: (res) => this.tipoviZvanja = res,
      error: (err) => console.error('Greška prilikom učitavanja tipova zvanja:', err),
    });
  }

  izmeni(tipZvanja: TipZvanja): void {
    this.router.navigate(['/tipovi-zvanja/forma', tipZvanja.id]);
  }

  obrisi(id: number): void {
    this.tipZvanjaService.delete(id).subscribe(() => {
      this.tipoviZvanja = this.tipoviZvanja.filter(a => a.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/tipovi-zvanja', id]);
  }

  otkazi(): void {
    this.router.navigate(['/tipovi-zvanja']);
  }
}
