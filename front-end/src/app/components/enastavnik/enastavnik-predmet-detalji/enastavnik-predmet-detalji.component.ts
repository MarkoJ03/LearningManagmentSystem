import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Predmet } from '../../../models/Predmet';
import { PredmetService } from '../../../services/predmet.service';
import { CommonModule } from '@angular/common';
import { EnastavnikObavestenjaPredmetComponent } from '../enastavnik-obavestenja-predmet/enastavnik-obavestenja-predmet.component';

@Component({
  selector: 'app-enastavnik-predmet-detalji',
  standalone: true,
  imports: [CommonModule, EnastavnikObavestenjaPredmetComponent, RouterOutlet],
  templateUrl: './enastavnik-predmet-detalji.component.html',
  styleUrls: ['./enastavnik-predmet-detalji.component.css']
})
export class EnastavnikPredmetDetaljiComponent implements OnInit {
  nastavnikId!: number;
  predmetId!: number;
  predmet?: Predmet;
  loading: boolean = false;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private predmetService: PredmetService
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      const nastavnikParam = params.get('id');
      if (nastavnikParam) {
        this.nastavnikId = +nastavnikParam;
      }
    });

    this.route.paramMap.subscribe(params => {
      const predmetParam = params.get('predmetId');
      if (predmetParam) {
        this.predmetId = +predmetParam;
        this.loadPredmet();
      }
    });
  }

  loadPredmet(): void {
    if (!this.predmetId) return;

    this.loading = true;
    this.error = undefined;

    this.predmetService.getById(this.predmetId).subscribe({
      next: (predmet) => {
        this.predmet = predmet;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Greška pri učitavanju predmeta.';
        console.error('Predmet loading error:', err);
        this.loading = false;
      }
    });
  }
}
