import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObavestenjeService } from '../../../services/obavestenje.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enastavnik-obavestenja-predmet',
  imports: [CommonModule],
  templateUrl: './enastavnik-obavestenja-predmet.component.html',
  styleUrl: './enastavnik-obavestenja-predmet.component.css'
})
export class EnastavnikObavestenjaPredmetComponent {
  @Input() obavestenja: any[] = [];

  constructor(
    private router: Router,
    private obavestenjeService: ObavestenjeService
  ) {}

  dodaj(): void {
    this.router.navigate(['/obavestenja/forma']);
  }

  izmeni(id: number): void {
    this.router.navigate(['/obavestenja/forma', id]);
  }

  obrisi(id: number): void {
    if (confirm('Da li ste sigurni da želite da obrišete ovo obaveštenje?')) {
      this.obavestenjeService.delete(id).subscribe({
        next: () => {
          this.obavestenja = this.obavestenja.filter(o => o.id !== id);
        },
        error: err => console.error('Greška pri brisanju obaveštenja:', err)
      });
    }
  }
}
