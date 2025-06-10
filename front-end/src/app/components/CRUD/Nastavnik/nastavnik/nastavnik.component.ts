import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Nastavnik } from '../../../../models/Nastavnik';
import { Zvanje } from '../../../../models/Zvanje';
import { Katedra } from '../../../../models/Katedra';
import { Departman } from '../../../../models/Departaman';
import { RealizacijaPredmeta } from '../../../../models/RealizacijaPredmeta';
import { Obavestenje } from '../../../../models/Obavestenje';
import { EvaluacijaZnanja } from '../../../../models/EvaluacijaZnanja';
import { NastavnikService } from '../../../../services/nastavnik.service';

@Component({
  selector: 'app-nastavnik',
  imports: [CommonModule, RouterLink],
  templateUrl: './nastavnik.component.html',
  styleUrl: './nastavnik.component.css'
})
export class NastavnikComponent {
  nastavnik: Nastavnik | null = null;
  zvanja: Zvanje[] = [];
  departmani: Departman[] = [];
  katedre: Katedra[] = [];
  realizacijePredmeta: RealizacijaPredmeta[] = [];
  obavestenja: Obavestenje[] = [];
  evaluacijeZnanja: EvaluacijaZnanja[] = []; 
  
    constructor(
      private route: ActivatedRoute,
      private nastavnikService: NastavnikService
    ) {}
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = +params['id'];
        this.nastavnikService.getById(id).subscribe(n => {
          this.nastavnik = n;
          console.log('Nastavnik:', n);
        });
      });
    }
}
