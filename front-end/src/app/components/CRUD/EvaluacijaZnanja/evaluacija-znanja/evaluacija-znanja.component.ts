import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IshodEvaluacije } from '../../../../models/IshodEvaluacije';
import { EvaluacijaZnanja } from '../../../../models/EvaluacijaZnanja';
import { EvaluacijaZnanjaService } from '../../../../services/evaluacija-znanja.service';
import { GrupaStudenata } from '../../../../models/GrupaStudenata';

@Component({
  selector: 'app-evaluacija-znanja',
  imports: [CommonModule, RouterLink],
  templateUrl: './evaluacija-znanja.component.html',
  styleUrl: './evaluacija-znanja.component.css'
})
export class EvaluacijaZnanjaComponent {
  evaluacijaZnanja: EvaluacijaZnanja | null = null;
  ishodiEvaluacije: IshodEvaluacije[] = [];
  grupaStudenata: GrupaStudenata[] = [];
  
    constructor(
      private route: ActivatedRoute,
      private evaluacijaZnanjaService: EvaluacijaZnanjaService
    ) {}
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = +params['id'];
        this.evaluacijaZnanjaService.getById(id).subscribe(e => {
          this.evaluacijaZnanja = e;
          console.log('Evaluacija znanja:', e);
        });
      });
    }
}
