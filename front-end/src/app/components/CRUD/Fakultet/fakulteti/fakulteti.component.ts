import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseTableComponent } from '../../../base-table/base-table.component';
import { Fakultet } from '../../../../models/Fakultet';
import { FakultetService } from '../../../../services/fakultet.service';

@Component({
  selector: 'app-fakulteti',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './fakulteti.component.html',
  styleUrl: './fakulteti.component.css'
})
export class FakultetiComponent {
  fakulteti: Fakultet[] = [];
  kolone: string[] = ['naziv', 'univerzitet', 'departmani', 'vidljiv'];

  constructor(
    private fakultetService: FakultetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fakultetService.getAll().subscribe({
      next: (res) => this.fakulteti = res,
      error: (err) => console.error('Greška prilikom učitavanja fakulteta:', err),
    });
  }

  izmeni(fakultet: Fakultet): void {
    this.router.navigate(['/fakulteti/forma', fakultet.id]);
  }

  obrisi(id: number): void {
    this.fakultetService.delete(id).subscribe(() => {
      this.fakulteti = this.fakulteti.filter(a => a.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/fakulteti', id]);
  }

  otkazi(): void {
    this.router.navigate(['/fakulteti']);
  }
}
