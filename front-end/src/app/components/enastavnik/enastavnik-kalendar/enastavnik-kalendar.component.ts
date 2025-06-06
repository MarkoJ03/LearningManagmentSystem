import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KalendarService } from '../../../services/kalendar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enastavnik-kalendar',
  imports: [CommonModule],
  templateUrl: './enastavnik-kalendar.component.html',
  styleUrls: ['./enastavnik-kalendar.component.css']
})
export class EnastavnikKalendarComponent implements OnInit {
  termini: any[] = [];
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private kalendarService: KalendarService
  ) {}

  ngOnInit(): void {
    const nastavnikId = Number(this.route.snapshot.paramMap.get('id'));
    if (nastavnikId) {
      this.kalendarService.getByNastavnikId(nastavnikId).subscribe({
        next: (data) => this.termini = data,
        error: () => this.error = 'Greška pri dohvatanju kalendara.'
      });
    }
  }
}
