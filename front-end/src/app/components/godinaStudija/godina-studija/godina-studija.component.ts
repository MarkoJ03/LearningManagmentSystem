import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GodinaStudija } from '../../../models/GodinaStudija';
import { GodinaStudijaService } from '../../../services/godina-studija.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-godina-studija',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './godina-studija.component.html',
  styleUrls: ['./godina-studija.component.css']
})
export class GodinaStudijaComponent implements OnInit {
  godinaStudija: GodinaStudija | null = null;

  constructor(
    private route: ActivatedRoute,
    private service: GodinaStudijaService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.service.getById(id).subscribe({
      next: (data) => (this.godinaStudija = data),
      error: (err) => console.error('Greška:', err)
    });
  }
}
