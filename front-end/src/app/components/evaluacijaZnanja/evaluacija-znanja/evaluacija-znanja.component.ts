import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EvaluacijaZnanja } from '../../../models/EvaluacijaZnanja';
import { EvaluacijaZnanjaService } from '../../../services/evaluacija-znanja.service';

@Component({
  selector: 'app-evaluacija-znanja',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './evaluacija-znanja.component.html',
  styleUrls: ['./evaluacija-znanja.component.css']
})
export class EvaluacijaZnanjaComponent implements OnInit {

  evaluacijaZnanja: EvaluacijaZnanja | null = null;

  constructor(
    private route: ActivatedRoute,
    private evaluacijaZnanjaService: EvaluacijaZnanjaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idParam = params['id'];
      const id = Number(idParam);

      if (!isNaN(id) && id > 0) {
        this.evaluacijaZnanjaService.getById(id).subscribe({
          next: b => {
            this.evaluacijaZnanja = b;
            console.log('Evaluacija znanja:', b);
            console.log("da li se ovaj korisi")
          },
          error: err => {
            console.error('Greška pri dohvaćanju:', err);
          }
        });
      } else {
        console.warn('Nevalidan ID:', idParam);
      }
    });
  }
}
