import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseTableComponent } from '../../../base-table/base-table.component';
import { Obavestenje } from '../../../../models/Obavestenje';
import { ObavestenjeService } from '../../../../services/obavestenje.service';

@Component({
  selector: 'app-obavestenja',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './obavestenja.component.html',
  styleUrl: './obavestenja.component.css'
})
export class ObavestenjaComponent {
  obavestenja: Obavestenje[] = [];
  kolone: string[] = ['nastavnik', 'naslov', 'sadrzaj', 'predmet', 'vidljiv'];

  constructor(
    private obavestenjeService: ObavestenjeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obavestenjeService.getAll().subscribe({
      next: (res) => this.obavestenja = res,
      error: (err) => console.error('Greška prilikom učitavanja obavestenja:', err),
    });
  }

  izmeni(obavestenje: Obavestenje): void {
    this.router.navigate(['/obavestenja/forma', obavestenje.id]);
  }

  obrisi(id: number): void {
    this.obavestenjeService.delete(id).subscribe(() => {
      this.obavestenja = this.obavestenja.filter(a => a.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/obavestenja', id]);
  }

  otkazi(): void {
    this.router.navigate(['/obavestenja']);
  }
}
