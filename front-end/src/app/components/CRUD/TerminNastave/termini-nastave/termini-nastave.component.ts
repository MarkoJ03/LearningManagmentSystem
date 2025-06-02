import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseTableComponent } from '../../../base-table/base-table.component';
import { TerminNastave } from '../../../../models/TerminNastave';
import { TerminNastaveService } from '../../../../services/termin-nastave.service';

@Component({
  selector: 'app-termini-nastave',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './termini-nastave.component.html',
  styleUrl: './termini-nastave.component.css'
})
export class TerminiNastaveComponent {
  terminiNastave: TerminNastave[] = [];
  kolone: string[] = ['vremePocetka', 'vremeKraja', 'brojCasova', 'realizacijaPredmeta', 'kalendar', 'vidljiv'];

  constructor(
    private terminNastaveService: TerminNastaveService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.terminNastaveService.getAll().subscribe({
      next: (res) => this.terminiNastave = res,
      error: (err) => console.error('Greška prilikom učitavanja termina nastave:', err),
    });
  }

  izmeni(terminNastave: TerminNastave): void {
    this.router.navigate(['/termini-nastave/forma', terminNastave.id]);
  }

  obrisi(id: number): void {
    this.terminNastaveService.delete(id).subscribe(() => {
      this.terminiNastave = this.terminiNastave.filter(a => a.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/termini-nastave', id]);
  }

  otkazi(): void {
    this.router.navigate(['/termini-nastave']);
  }
}
