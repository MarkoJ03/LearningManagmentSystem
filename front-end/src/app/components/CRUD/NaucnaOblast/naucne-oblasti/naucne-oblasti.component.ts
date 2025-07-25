import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseTableComponent } from '../../../base-table/base-table.component';
import { NaucnaOblast } from '../../../../models/NaucnaOblast';
import { NaucnaOblastService } from '../../../../services/naucna-oblast.service';

@Component({
  selector: 'app-naucne-oblasti',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './naucne-oblasti.component.html',
  styleUrl: './naucne-oblasti.component.css'
})
export class NaucneOblastiComponent {
  naucneOblasti: NaucnaOblast[] = [];
  kolone: string[] = ['naziv', 'zvanjaPrikaz', 'vidljiv']; 
  naucneOblastiPrikaz: any[] = [];

  constructor(
    private naucnaOblastService: NaucnaOblastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.naucnaOblastService.getAll().subscribe({
      next: (res) => {
        this.naucneOblasti = res;
        this.naucneOblastiPrikaz = this.naucneOblasti.map(no => ({
          ...no,
          zvanjaPrikaz: no.zvanja?.map(z => z.tipZvanja.naziv).join(', ')
        }));
      },
      error: (err) => console.error('Greška prilikom učitavanja naucnih oblasti:', err),
    });
  }

  izmeni(naucnaOblast: NaucnaOblast): void {
    this.router.navigate(['/naucne-oblasti/forma', naucnaOblast.id]);
  }

  obrisi(id: number): void {
    this.naucnaOblastService.delete(id).subscribe(() => {
      this.naucneOblasti = this.naucneOblasti.filter(v => v.id !== id);
      this.naucneOblastiPrikaz = this.naucneOblasti.map(no => ({
        ...no,
        zvanjaPrikaz: no.zvanja?.map(z => z.tipZvanja.naziv).join(', ')
      }));
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/naucne-oblasti', id]);
  }

  otkazi(): void {
    this.router.navigate(['/naucne-oblasti']);
  }
}
