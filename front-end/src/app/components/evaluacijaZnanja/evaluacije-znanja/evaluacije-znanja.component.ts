import { Component } from '@angular/core';
import { BaseTableComponent } from '../../base-table/base-table.component';
import { Router, RouterLink } from '@angular/router';
import { EvaluacijaZnanja } from '../../../models/EvaluacijaZnanja';
import { EvaluacijaZnanjaService } from '../../../services/evaluacija-znanja.service';

@Component({
  selector: 'app-evaluacije-znanja',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './evaluacije-znanja.component.html',
  styleUrl: './evaluacije-znanja.component.css'
})
export class EvaluacijeZnanjaComponent {

evaluacijeZnanja: EvaluacijaZnanja[] = [];
  kolone: string[] = ['kalendar', 'nastavnik','predmet','tipEvaluacije','vremePocetka','vremeZavrsetka'];

  constructor(
    private evaluacijaZnanjaService: EvaluacijaZnanjaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.evaluacijaZnanjaService.getAll().subscribe({
      next: (res) => {
        this.evaluacijeZnanja = res;

       
        
      },
      error: (err) => console.error('Greška prilikom učitavanja evaluacije znanja:', err),
    });
  }

  izmeni(evaluacijaZnanja: EvaluacijaZnanja): void {
    this.router.navigate(['/EvaluacijaZnanja/izmeni', evaluacijaZnanja.id]);
  }

  obrisi(id: number): void {
    this.evaluacijaZnanjaService.delete(id).subscribe(() => {
      this.evaluacijeZnanja = this.evaluacijeZnanja.filter(v => v.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/EvaluacijaZnanja', id]);
  }

  otkazi(): void {
    this.router.navigate(['/EvaluacijaZnanja']);
  }


}
