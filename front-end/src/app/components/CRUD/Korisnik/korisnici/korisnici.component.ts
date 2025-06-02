import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseTableComponent } from '../../../base-table/base-table.component';
import { Korisnik } from '../../../../models/Korisnik';
import { KorisnikService } from '../../../../services/korisnik.service';

@Component({
  selector: 'app-korisnici',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './korisnici.component.html',
  styleUrl: './korisnici.component.css'
})
export class KorisniciComponent {
  korisnici: Korisnik[] = [];
  kolone: string[] = ['email', 'vidljiv'];

  constructor(
    private korisnikService: KorisnikService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.korisnikService.getAll().subscribe({
      next: (res) => this.korisnici = res,
      error: (err) => console.error('Greška prilikom učitavanja korisnika:', err),
    });
  }

  izmeni(korisnik: Korisnik): void {
    this.router.navigate(['/korisnici/forma', korisnik.id]);
  }

  obrisi(id: number): void {
    this.korisnikService.delete(id).subscribe(() => {
      this.korisnici = this.korisnici.filter(a => a.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/korisnici', id]);
  }

  otkazi(): void {
    this.router.navigate(['/korisnici']);
  }
}
