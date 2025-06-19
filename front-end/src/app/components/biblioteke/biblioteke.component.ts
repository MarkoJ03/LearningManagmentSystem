import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Biblioteka } from '../../models/Biblioteka';
import { BibliotekaService } from '../../services/biblioteka.service';
import { BibliotekaKnjigaService } from '../../services/biblioteka-knjiga.service';
import { BaseTableComponent } from '../base-table/base-table.component';

@Component({
  selector: 'app-biblioteke',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './biblioteke.component.html',
  styleUrl: './biblioteke.component.css'
})
export class BibliotekeComponent {
  biblioteke: Biblioteka[] = [];
  kolone: string[] = ['studentskaSluzba', 'nazivKnjige'];

  constructor(
    private bibliotekaSerivce: BibliotekaService,
    private bibliotekaKnjigaService: BibliotekaKnjigaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bibliotekaSerivce.getAll().subscribe({
  next: (res) => {
    this.biblioteke = res.map(n => ({
      ...n,
      
    nazivKnjige: n.knjige?.map(o => o.knjiga?.naziv).join(', ') || ''
    }));
  },
  error: (err) => console.error('Greška prilikom učitavanja nastavnika:', err),
});

  }

  izmeni(biblioteka: Biblioteka): void {
    this.router.navigate(['/biblioteke/izmeni', biblioteka.id]);
  }

  obrisi(id: number): void {
    this.bibliotekaSerivce.delete(id).subscribe(() => {
      this.biblioteke = this.biblioteke.filter(v => v.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/biblioteke', id]);
  }

  otkazi(): void {
    this.router.navigate(['/biblioteke']);
  }
}
