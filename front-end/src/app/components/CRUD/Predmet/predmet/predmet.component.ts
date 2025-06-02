import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Predmet } from '../../../../models/Predmet';
import { EvaluacijaZnanja } from '../../../../models/EvaluacijaZnanja';
import { GrupaStudenata } from '../../../../models/GrupaStudenata';
import { RealizacijaPredmeta } from '../../../../models/RealizacijaPredmeta';
import { PredmetService } from '../../../../services/predmet.service';
import { Obavestenje } from '../../../../models/Obavestenje';

@Component({
  selector: 'app-predmet',
  imports: [CommonModule, RouterLink],
  templateUrl: './predmet.component.html',
  styleUrl: './predmet.component.css'
})
export class PredmetComponent {
  predmet: Predmet | null = null;
  evaluacijeZnanja: EvaluacijaZnanja[] | null = null;
  grupeStudenata: GrupaStudenata[] | null = null;
  realizacijePredmeta: RealizacijaPredmeta[] | null = null;
  obavestenja: Obavestenje[] | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private predmetService: PredmetService
    ) {}
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = +params['id'];
        this.predmetService.getById(id).subscribe(p => {
          this.predmet = p;
          console.log('Predmet:', p);
        });
      });
    }
}
