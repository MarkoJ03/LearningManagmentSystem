import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Silabus } from '../../../models/Silabus';
import { SilabusService } from '../../../services/silabus.service';
import { BaseTableComponent } from '../../base-table/base-table.component';

@Component({
  selector: 'app-silabusi',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './silabusi.component.html',
  styleUrl: './silabusi.component.css'
})
export class SilabusiComponent {


  silabusi: Silabus[] = [];
  kolone: string[] = [ 'termini','vidljiv'];


  constructor(
    private silabusService: SilabusService,
    private router: Router
  ) {}


ngOnInit(): void {
    this.silabusService.getAll().subscribe({
      next: (res) => this.silabusi = res,
      error: (err) => console.error('Greška prilikom učitavanja drzave:', err),
    });
  }

  izmeni(silabus: Silabus): void {
    this.router.navigate(['/Silabus/izmeni', silabus.id]);
  }

  obrisi(id: number): void {
    this.silabusService.delete(id).subscribe(() => {
      this.silabusi = this.silabusi.filter(a => a.id !== id);
    });
  }



  detalji(id: number): void {
    this.router.navigate(['/Silabus', id]);
  }

  otkazi(): void {
    this.router.navigate(['/Silabus']);
  }

}
