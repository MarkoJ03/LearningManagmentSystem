import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseTableComponent } from '../../../base-table/base-table.component';
import { Predmet } from '../../../../models/Predmet';
import { PredmetService } from '../../../../services/predmet.service';

@Component({
  selector: 'app-predmeti',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './predmeti.component.html',
  styleUrl: './predmeti.component.css'
})
export class PredmetiComponent {
  predmeti: Predmet[] = [];
  kolone: string[] = ['naziv', 'esbp', 'obavezan', 'brojPredavanja', 'brojVezbi', 
    'istrazivackiRad', 'brojSemestara', 'opis', 'cilj', 'dokumentiPredmeta', 
    'evaluacijeZnanja', 'grupaStudenata', 'realizacijePredmeta', 'obavestenja'];

  constructor(
    private predmetService: PredmetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.predmetService.getAll().subscribe({
      next: (res) => this.predmeti = res,
      error: (err) => console.error('Greška prilikom učitavanja predmeta:', err),
    });
  }

  izmeni(predmet: Predmet): void {
    this.router.navigate(['/predmeti/forma', predmet.id]);
  }

  obrisi(id: number): void {
    this.predmetService.delete(id).subscribe(() => {
      this.predmeti = this.predmeti.filter(a => a.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/predmeti', id]);
  }

  otkazi(): void {
    this.router.navigate(['/predmeti']);
  }
}
