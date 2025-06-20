import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Predmet } from '../../../models/Predmet';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NastavnikService } from '../../../services/nastavnik.service';

@Component({
  selector: 'app-enastavnik-predmeti',
  imports: [CommonModule, RouterLink],
  templateUrl: './enastavnik-predmeti.component.html',
  styleUrls: ['./enastavnik-predmeti.component.css']
})
export class EnastavnikPredmetiComponent implements OnInit {
  predmeti: Predmet[] = [];
  nastavnikId!: number;
  loading = false;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private nastavnikService: NastavnikService
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      const idParam = params.get('id');

      if (!idParam) {
        this.error = 'Nastavnik ID nije pronađen u parametrima rute.';
        return;
      }

      this.nastavnikId = Number(idParam);

      if (isNaN(this.nastavnikId) || this.nastavnikId <= 0) {
        this.error = 'Nevažeći ID nastavnika.';
        return;
      }

      this.loadPredmeti();
    });
  }

  loadPredmeti() {
    this.loading = true;
    this.error = undefined;

    this.nastavnikService.getById(this.nastavnikId).subscribe({
      next: (nastavnik) => {
        console.log('Nastavnik:', nastavnik);
        this.predmeti = [];

        if (nastavnik.realizacijePredmeta) {
          for (const realizacija of nastavnik.realizacijePredmeta) {
            if (realizacija.predmeti) {
              for (const prp of realizacija.predmeti) {
                if (prp.predmet && !this.predmeti.some(p => p.id === prp.predmet.id)) {
                  this.predmeti.push(prp.predmet);
                }
              }
            }
          }
        }

        this.loading = false;
      },
      error: (err) => {
        this.error = 'Greška pri dohvatu nastavnika.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  trackByPredmetId(index: number, predmet: Predmet): number {
  return predmet.id;
}

}
