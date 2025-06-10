import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Katedra } from '../../../../models/Katedra';
import { StudijskiProgram } from '../../../../models/StudijskiProgram';
import { Nastavnik } from '../../../../models/Nastavnik';
import { KatedraService } from '../../../../services/katedra.service';

@Component({
  selector: 'app-katedra',
  imports: [CommonModule, RouterLink],
  templateUrl: './katedra.component.html',
  styleUrl: './katedra.component.css'
})
export class KatedraComponent {
  katedra: Katedra | null = null;
  studijskiProgrami: StudijskiProgram[] = [];
  nastavnici: Nastavnik[] = [];
  
    constructor(
      private route: ActivatedRoute,
      private katedraService: KatedraService
    ) {}
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = +params['id'];
        this.katedraService.getById(id).subscribe(k => {
          this.katedra = k;
          console.log('Katedra:', k);
        });
      });
    }
}
