import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseTableComponent } from '../../../base-table/base-table.component';
import { EvaluacijaZnanja } from '../../../../models/EvaluacijaZnanja';
import { EvaluacijaZnanjaService } from '../../../../services/evaluacija-znanja.service';

@Component({
  selector: 'app-evaluacije-znanja',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './evaluacije-znanja.component.html',
  styleUrl: './evaluacije-znanja.component.css'
})
export class EvaluacijeZnanjaComponent {
  evaluacijeZnanja: EvaluacijaZnanja[] = [];
  kolone: string[] = ['kalendar', 'nastavnikImePrezime', 'predmet', 'tipEvaluacije', 'vremePocetka', 'vremeZavrsetka', 'vidljiv'];

  constructor(
    private evaluacijaZnanjaService: EvaluacijaZnanjaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.evaluacijaZnanjaService.getAll().subscribe({
      next: (res) => {
        console.log("podaci ", res);
        
        this.evaluacijeZnanja = res.map(e => ({
          ...e,
          nastavnikImePrezime: `${e.nastavnik.ime} ${e.nastavnik.prezime}`,
        }));
      },
      error: (err) => console.error('Greška prilikom učitavanja evaluacija znanja:', err),
    });
  }

  izmeni(evaluacijaZnanja: EvaluacijaZnanja): void {
    this.router.navigate(['/evaluacije-znanja/forma', evaluacijaZnanja.id]);
  }

  obrisi(id: number): void {
    this.evaluacijaZnanjaService.delete(id).subscribe(() => {
      this.evaluacijeZnanja = this.evaluacijeZnanja.filter(a => a.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/evaluacije-znanja', id]);
  }

  otkazi(): void {
    this.router.navigate(['/evaluacije-znanja']);
  }
}
