import { Component } from '@angular/core';
import { BaseTableComponent } from '../base-table/base-table.component';
import { Router, RouterLink } from '@angular/router';
import { Biblioteka } from '../../models/Biblioteka';
import { BibliotekaService } from '../../services/biblioteka.service';

@Component({
  selector: 'app-biblioteke',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './biblioteke.component.html',
  styleUrl: './biblioteke.component.css'
})
export class BibliotekeComponent {


  
  biblioteke: Biblioteka[] = [];
  kolone: string[] = ['studentska_sluzba', 'bibliotekaKnjiga'];

  constructor(
    private bibliotekaSerivce: BibliotekaService,
    private router: Router
  ) {}

   ngOnInit(): void {
    this.bibliotekaSerivce.getAll().subscribe({
      next: (res) => this.biblioteke = res,
      error: (err) => console.error('Greška prilikom učitavanja biblioteke:', err),
      
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
