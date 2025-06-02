import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { UniverzitetFooterComponent } from '../../../components/shared/univerzitet-footer/univerzitet-footer.component';
import { UniverzitetHeaderComponent } from '../../../components/shared/univerzitet-header/univerzitet-header.component';
import { Predmet } from '../../models/Predmet';
import { PredmetService } from '../../services/predmet.service';

@Component({
  selector: 'app-predmet-layout',
  imports: [CommonModule],
  templateUrl: './predmet-layout.component.html',
  styleUrl: './predmet-layout.component.css'
})
export class PredmetLayoutComponent {

 predmet: Predmet | null = null;

  constructor(
    private route: ActivatedRoute,
    private predmetService: PredmetService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.predmetService.getById(id).subscribe({
        next: (data) => this.predmet = data,
        error: (err) => console.error('Greška pri dohvatanju predmeta:', err)
      });
    }
  }
}

