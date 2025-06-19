import { Component } from '@angular/core';
import { BaseTableComponent } from '../../base-table/base-table.component';
import { Router, RouterLink } from '@angular/router';
import { GrupaStudenata } from '../../../models/GrupaStudenata';
import { GrupaStudenataService } from '../../../services/grupa-studenata.service';

@Component({
  selector: 'app-grupe-studenata',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './grupe-studenata.component.html',
  styleUrl: './grupe-studenata.component.css'
})
export class GrupeStudenataComponent {

  grupe: GrupaStudenata[] = [];
  kolone: string[] = ['id', 'kalendar', 'vidljiv', 'studentiNaGodini'];

  constructor(
    private grupaService: GrupaStudenataService,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   this.grupaService.getAll().subscribe({
  //     next: (res) => {
  //       this.grupe = res;
  //     },
  //     error: (err) => console.error('Greška prilikom učitavanja grupa studenata:', err),
  //   });
  // }

   ngOnInit(): void {
    this.grupaService.getAll().subscribe({
  next: (res) => {
    this.grupe = res.map(n => ({
      ...n,
      
student: (n.studentiNaGodini || []).map(sp => sp.id).join(', '),    }));
  },
  error: (err) => console.error('Greška prilikom učitavanja godine studija:', err),
});

  }
  izmeni(grupa: GrupaStudenata): void {
    this.router.navigate(['/grupe-studenata/izmeni', grupa.id]);
  }

  obrisi(id: number): void {
    this.grupaService.delete(id).subscribe(() => {
      this.grupe = this.grupe.filter(g => g.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/grupe-studenata', id]);
  }

  otkazi(): void {
    this.router.navigate(['/grupe-studenata']);
  }

}
