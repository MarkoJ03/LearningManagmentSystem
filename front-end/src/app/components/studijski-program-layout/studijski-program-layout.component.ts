import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GodinaStudija } from '../../models/GodinaStudija';
import { Predmet } from '../../models/Predmet';
import { GodinaStudijaPredmetService } from '../../services/godina-studija-predmet.service';
import { GodinaStudijaService } from '../../services/godina-studija.service';
import { CommonModule } from '@angular/common';
import { UniverzitetFooterComponent } from '../../../components/shared/univerzitet-footer/univerzitet-footer.component';
import { UniverzitetHeaderComponent } from '../../../components/shared/univerzitet-header/univerzitet-header.component';
import { StudijskiProgramService } from '../../services/studijski-program.service';
import { StudijskiProgram } from '../../models/StudijskiProgram';

@Component({
  selector: 'app-studijski-program-layout',
  imports: [CommonModule,RouterLink],
  templateUrl: './studijski-program-layout.component.html',
  styleUrl: './studijski-program-layout.component.css'
})
export class StudijskiProgramLayoutComponent implements OnInit {
  godineStudija: GodinaStudija[] = [];
  predmetiPoGodini: { [id: number]: Predmet[] } = {};
  studijskiProgram: StudijskiProgram| null = null;

  constructor(
    private route: ActivatedRoute,
    private godinaService: GodinaStudijaService,
    private gspService: GodinaStudijaPredmetService,
    private studijskiProgramService: StudijskiProgramService
  ) {}

  ngOnInit(): void {
    const programId = Number(this.route.snapshot.paramMap.get('id'));

    this.studijskiProgramService.getById(programId).subscribe({
      next: (program)=> {
        this.studijskiProgram=program;
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
  }
}