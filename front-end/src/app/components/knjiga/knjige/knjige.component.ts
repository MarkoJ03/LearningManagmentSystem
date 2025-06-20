import { Component } from '@angular/core';
import { BaseTableComponent } from '../../base-table/base-table.component';
import { Router, RouterLink } from '@angular/router';
import { Knjiga } from '../../../models/Knjiga';
import { KnjigaService } from '../../../services/knjiga.service';

@Component({
  selector: 'app-knjige',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './knjige.component.html',
  styleUrl: './knjige.component.css'
})
export class KnjigeComponent {
  knjige: Knjiga[] = [];
  kolone: string[] = ['naziv', 'isbn', 'vidljiv'];

  constructor(
    private knjigaService: KnjigaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.knjigaService.getAll().subscribe({
      next: (res) => {
        this.knjige = res;
      },
      error: (err) => console.error('Greška prilikom učitavanja knjiga:', err),
    });
  }

  izmeni(knjiga: Knjiga): void {
    this.router.navigate(['/knjige/izmeni', knjiga.id]);
  }

  obrisi(id: number): void {
    this.knjigaService.delete(id).subscribe(() => {
      this.knjige = this.knjige.filter(k => k.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/knjige', id]);
  }

  otkazi(): void {
    this.router.navigate(['/knjige']);
  }
}
