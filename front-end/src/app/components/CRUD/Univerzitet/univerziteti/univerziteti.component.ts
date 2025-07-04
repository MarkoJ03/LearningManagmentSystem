import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseTableComponent } from '../../../base-table/base-table.component';
import { Univerzitet } from '../../../../models/Univerzitet';
import { UniverzitetService } from '../../../../services/univerzitet.service';

@Component({
  selector: 'app-univerziteti',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './univerziteti.component.html',
  styleUrl: './univerziteti.component.css'
})
export class UniverzitetiComponent {
  univerziteti: Univerzitet[] = [];
  tabelaPodaci: any[] = [];
  kolone: string[] = ['naziv', 'datumOsnivanja', 'adresa', 'fakulteti', 'email', 'kontakt', 'vidljiv'];

  constructor(
    private univerzitetService: UniverzitetService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.univerzitetService.getAll().subscribe({
      next: (res) => {
        this.univerziteti = res;
        this.tabelaPodaci = res.map(u => ({
          ...u,
          adresa: `${u.adresa.ulica} ${u.adresa.broj}`
        }));
      },
      error: (err) => console.error('Greška prilikom učitavanja univerziteta:', err),
    });
  }

  izmeni(univerzitet: Univerzitet): void {
    this.router.navigate(['/univerziteti/forma', univerzitet.id]);
  }

  obrisi(id: number): void {
  this.univerzitetService.delete(id).subscribe(() => {
    this.univerziteti = this.univerziteti.filter(u => u.id !== id);
    this.tabelaPodaci = this.univerziteti.map(u => ({
      ...u,
      adresa: `${u.adresa.ulica} ${u.adresa.broj}`
    }));
  });
}


  detalji(id: number): void {
    this.router.navigate(['/univerziteti', id]);
  }

  otkazi(): void {
    this.router.navigate(['/univerziteti']);
  }
}
