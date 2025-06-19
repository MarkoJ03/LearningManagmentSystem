import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GodinaStudija } from '../../../models/GodinaStudija';
import { GodinaStudijaService } from '../../../services/godina-studija.service';
import { BaseTableComponent } from '../../base-table/base-table.component';
import { RouterLink } from '@angular/router';
import { StudijskiProgram } from '../../../models/StudijskiProgram'; // Uvezeno za tipovanje
import { TipPrograma } from '../../../models/TipPrograma'; // Uvezeno za tipovanje

@Component({
  selector: 'app-godine-studija',
  standalone: true,
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './godine-studija.component.html',
  styleUrls: ['./godine-studija.component.css']
})
export class GodineStudijaComponent implements OnInit {
  godineStudija: GodinaStudija[] = [];

  kolone: string[] = ['godina', 'studijskiProgram', 'brojeviIndeksa']; // Promenjeno ovde!

  constructor(
    private service: GodinaStudijaService,
    private router: Router
  ) {}

  
  ngOnInit(): void {
    this.service.getAll().subscribe({
  next: (res) => {
    this.godineStudija = res.map(n => ({
      ...n,
      
brojeviIndeksa: (n.studentiNaGodini || []).map(sp => sp.brojIndeksa).join(', '),    }));
  },
  error: (err) => console.error('Greška prilikom učitavanja godine studija:', err),
});

  }
  izmeni(godina: GodinaStudija): void {
    this.router.navigate(['/godine-studija/izmeni', godina.id]);
  }

  obrisi(id: number): void {
    this.service.delete(id).subscribe(() => {
      this.godineStudija = this.godineStudija.filter(g => g.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/godine-studija', id]);
  }
}
