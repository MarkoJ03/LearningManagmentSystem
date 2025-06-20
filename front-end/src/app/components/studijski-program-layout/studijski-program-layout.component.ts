import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { GodinaStudija } from '../../models/GodinaStudija';
import { Predmet } from '../../models/Predmet';
import { GodinaStudijaPredmetService } from '../../services/godina-studija-predmet.service';
import { GodinaStudijaService } from '../../services/godina-studija.service';
import { CommonModule } from '@angular/common';
import { StudijskiProgramService } from '../../services/studijski-program.service';
import { StudijskiProgram } from '../../models/StudijskiProgram';

@Component({
  selector: 'app-studijski-program-layout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './studijski-program-layout.component.html',
  styleUrl: './studijski-program-layout.component.css'
})
export class StudijskiProgramLayoutComponent implements OnInit {
  godineStudija: GodinaStudija[] = [];
  predmetiPoGodini: { [id: number]: Predmet[] } = {};
  studijskiProgram: StudijskiProgram | null = null;

  constructor(
    private route: ActivatedRoute,
    private godinaService: GodinaStudijaService,
    private gspService: GodinaStudijaPredmetService,
    private studijskiProgramService: StudijskiProgramService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const programId = Number(params.get('id'));
      if (!programId) return;

      window.scrollTo({ top: 0, behavior: 'smooth' });

      // reset starih vrednosti
      this.studijskiProgram = null;
      this.godineStudija = [];
      this.predmetiPoGodini = {};

      this.studijskiProgramService.getById(programId).subscribe({
        next: (program) => {
          this.studijskiProgram = program;
        },
        error: (err) => {
          console.error('Greška pri dohvatanju studijskog programa:', err);
        }
      });

      this.godinaService.getByProgramId(programId).subscribe({
        next: (godine) => {
          this.godineStudija = godine;

          for (const g of godine) {
            this.gspService.getByGodinaId(g.id).subscribe({
              next: (veze) => {
                this.predmetiPoGodini[g.id] = veze.map(v => v.predmet);
              },
              error: (err) => console.error('Greška za godinu', g.id, err)
            });
          }
        },
        error: (err) => console.error('Greška pri dohvatu godina studija:', err)
      });
    });
  }
}
