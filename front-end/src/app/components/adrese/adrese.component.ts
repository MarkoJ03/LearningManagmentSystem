import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Adresa } from '../../models/Adresa';
import { AdresaService } from '../../services/adresa.service';
import { BaseTableComponent } from '../base-table/base-table.component';

@Component({
  selector: 'app-adrese',
  standalone: true,
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './adrese.component.html',
  styleUrl: './adrese.component.css'
})
export class AdreseComponent {

  adrese: Adresa[] = [];
  kolone: string[] = ['broj', 'ulica', 'grad', 'vidljiv'];

  constructor(
    private adresaService: AdresaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adresaService.getAll().subscribe({
      next: (res) => this.adrese = res,
      error: (err) => console.error('Greška prilikom učitavanja adresa:', err),
    });
  }

  izmeni(adresa: Adresa): void {
    this.router.navigate(['/adrese/izmeni', adresa.id]);
  }

  obrisi(id: number): void {
    this.adresaService.delete(id).subscribe(() => {
      this.adrese = this.adrese.filter(a => a.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/adrese', id]);
  }

  otkazi(): void {
    this.router.navigate(['/adrese']);
  }
}
