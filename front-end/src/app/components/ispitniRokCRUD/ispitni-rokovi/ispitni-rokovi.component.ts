import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IspitniRok } from '../../../models/IspitniRok';
import { IspitniRokService } from '../../../services/ispitni-rok.service';
import { BaseTableComponent } from '../../base-table/base-table.component';

@Component({
  selector: 'app-ispitni-rokovi',
  imports: [BaseTableComponent,RouterLink],
  templateUrl: './ispitni-rokovi.component.html',
  styleUrl: './ispitni-rokovi.component.css'
})
export class IspitniRokoviComponent {
rokovi: IspitniRok[] = [];
  kolone: string[] = ['naziv', 'datumPocetka', 'datumZavrsetka', 'vidljiv'];

  constructor(
    private ispitniRokService: IspitniRokService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ispitniRokService.getAll().subscribe({
      next: (res) => {
        this.rokovi = res;
      },
      error: (err) => console.error('Greška prilikom učitavanja ishoda predmeta:', err),
    });
  }

  izmeni(ishod: IspitniRok): void {
    this.router.navigate(['/ishod-predmeta/izmeni', ishod.id]);
  }

  obrisi(id: number): void {
    this.ispitniRokService.delete(id).subscribe(() => {
      this.rokovi = this.rokovi.filter(i => i.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/ishod-predmeta', id]);
  }

  otkazi(): void {
    this.router.navigate(['/ishod-predmeta']);
  }
}
