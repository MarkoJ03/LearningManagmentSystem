import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SvObrazac } from '../../../models/SvObrazac';
import { SvObrazacService } from '../../../services/sv-obrazac.service';
import { BaseTableComponent } from '../../base-table/base-table.component';

@Component({
  selector: 'app-sv-obrasci',
  standalone: true,
  imports: [BaseTableComponent,RouterLink],
  templateUrl: './sv-obrasci.component.html',
  styleUrls: ['./sv-obrasci.component.css']
})
export class SvObrasciComponent implements OnInit {
  obrasci: SvObrazac[] = [];
  kolone: string[] = ['maternjiJezik', 'vrstaZavreseneSrednje', 'datumZavrsetkaSrednje', 'bracniStatus', 'kontakt', 'zaposlen', 'nacinFinansiranja', 'vidljiv'];

  constructor(private service: SvObrazacService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (res) => this.obrasci = res,
      error: (err) => console.error('Greška:', err)
    });
  }

  izmeni(o: SvObrazac): void {
    this.router.navigate(['/sv-obrazac/izmeni', o.id]);
  }

  obrisi(id: number): void {
    this.service.delete(id).subscribe(() => {
      this.obrasci = this.obrasci.filter(e => e.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/sv-obrazac', id]);
  }

  otkazi(): void {
    this.router.navigate(['/sv-obrasci']);
  }
}
