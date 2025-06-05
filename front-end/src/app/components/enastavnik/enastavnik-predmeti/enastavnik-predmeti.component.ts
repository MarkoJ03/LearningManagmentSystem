import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Predmet } from '../../../models/Predmet';
import { ActivatedRoute } from '@angular/router';
import { NastavnikService } from '../../../services/nastavnik.service';

@Component({
  selector: 'app-enastavnik-predmeti',
  imports: [CommonModule],
  templateUrl: './enastavnik-predmeti.component.html',
  styleUrl: './enastavnik-predmeti.component.css'
})
export class EnastavnikPredmetiComponent {
  predmeti: Predmet[] = [];
  nastavnikId!: number;

  constructor(
    private route: ActivatedRoute,
    private nastavnikService: NastavnikService
  ) {}

  ngOnInit(): void {
    this.nastavnikId = Number(this.route.snapshot.paramMap.get('id'));

    this.nastavnikService.getById(this.nastavnikId).subscribe({
      next: (nastavnik) => {
        this.predmeti = (nastavnik.realizacijePredmeta || [])
          .map(rp => rp.predmet)
          .filter((predmet, index, self) =>
            predmet && self.findIndex(p => p.id === predmet.id) === index
          );
      },
      error: (err) => console.error('Greška pri dohvatu nastavnika:', err)
    });
  }
}
