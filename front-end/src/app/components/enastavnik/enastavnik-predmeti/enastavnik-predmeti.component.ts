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
  ) { }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      const idParam = params.get('id');

      if (!idParam) {
        console.warn('No nastavnik ID found in route parameters.');
        return;
      }

      this.nastavnikId = Number(idParam);
      console.log('Nastavnik ID:', this.nastavnikId);

      if (isNaN(this.nastavnikId) || this.nastavnikId <= 0) {
        console.warn('Invalid nastavnik ID:', this.nastavnikId);
        return;
      }

      this.nastavnikService.getById(this.nastavnikId).subscribe({

        next: (nastavnik) => {
          console.log('Response from server:', nastavnik);
          console.log('RealizacijePredmeta:', nastavnik.realizacijePredmeta);

          // this.predmeti = (nastavnik.realizacijePredmeta || [])
          //   .map(rp => rp.predmet)
          //   .filter((predmet, index, self) =>
          //     predmet && self.findIndex(p => p.id === predmet.id) === index
          //   );
          console.log('Dohvaćeni predmeti:', this.predmeti);
        },
        error: (err) => {
          console.error('Greška pri dohvatu nastavnika:', err);
        }
      });
    });
  }
}
