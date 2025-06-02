import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseTableComponent } from '../../../base-table/base-table.component';
import { Katedra } from '../../../../models/Katedra';
import { KatedraService } from '../../../../services/katedra.service';

@Component({
  selector: 'app-katedre',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './katedre.component.html',
  styleUrl: './katedre.component.css'
})
export class KatedreComponent {
  katedre: Katedra[] = [];
  kolone: string[] = ['naziv', 'departman', 'sefKatedre', 'sekretarKatedre', 'studijskiProgrami', 'nastavnici', 'vidljiv'];

  constructor(
    private katedraService: KatedraService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.katedraService.getAll().subscribe({
      next: (res) => this.katedre = res,
      error: (err) => console.error('Greška prilikom učitavanja katedri:', err),
    });
  }

  izmeni(katedra: Katedra): void {
    this.router.navigate(['/katedre/forma', katedra.id]);
  }

  obrisi(id: number): void {
    this.katedraService.delete(id).subscribe(() => {
      this.katedre = this.katedre.filter(a => a.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/katedre', id]);
  }

  otkazi(): void {
    this.router.navigate(['/katedre']);
  }
}
