import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseTableComponent } from '../../base-table/base-table.component';
import { SilabusTermin } from '../../../models/SilabusTermin';
import { SilabusTerminService } from '../../../services/silabus-termin.service';

@Component({
  selector: 'app-silabus-termini',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './silabus-termini.component.html',
  styleUrl: './silabus-termini.component.css'
})
export class SilabusTerminiComponent {



  
  silabusTermina: SilabusTermin[] = [];
  kolone: string[] = ['datum', 'materijal', 'cilj', 'opis','nastavnik','silabus','vidljiv'];

  constructor(
    private silabusTerminService: SilabusTerminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.silabusTerminService.getAll().subscribe({
      next: (res) => this.silabusTermina = res,
      error: (err) => console.error('Greška prilikom učitavanja adresa:', err),
    });
  }

  izmeni(silabus: SilabusTermin): void {
    this.router.navigate(['/SilabusTermin/izmeni', silabus.id]);
  }

  obrisi(id: number): void {
    this.silabusTerminService.delete(id).subscribe(() => {
      this.silabusTermina = this.silabusTermina.filter(a => a.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/SilabusTermin', id]);
  }

  otkazi(): void {
    this.router.navigate(['/SilabusTermin']);
  }
}
