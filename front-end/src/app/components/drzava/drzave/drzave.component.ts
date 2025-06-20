import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Drzava } from '../../../models/Drzava';
import { DrzavaService } from '../../../services/drzava.service';
import { BaseTableComponent } from '../../base-table/base-table.component';

@Component({
  selector: 'app-drzava',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './drzava.component.html',
  styleUrl: './drzava.component.css'
})
export class DrzavaComponent {


  drzave: Drzava[] = [];
  kolone: string[] = ['naziv', 'gradovi','vidljiv'];


  constructor(
    private drzavaService: DrzavaService,
    private router: Router
  ) {}

ngOnInit(): void {
    this.drzavaService.getAll().subscribe({
      next: (res) => this.drzave = res,
      error: (err) => console.error('Greška prilikom učitavanja drzave:', err),
    });
  }

  izmeni(drzava: Drzava): void {
    this.router.navigate(['/Drzava/izmeni', drzava.id]);
  }

  obrisi(id: number): void {
    this.drzavaService.delete(id).subscribe(() => {
      this.drzave = this.drzave.filter(a => a.id !== id);
    });
  }



  detalji(id: number): void {
    this.router.navigate(['/Drzava', id]);
  }

  otkazi(): void {
    this.router.navigate(['/Drzava']);
  }

}

