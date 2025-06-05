import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PredmetService } from '../../services/predmet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-silabus-layout',
  imports: [CommonModule],
  templateUrl: './silabus-layout.component.html',
  styleUrl: './silabus-layout.component.css'
})
export class SilabusLayoutComponent implements OnInit{

 termini: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private predmetService: PredmetService
  ) {}

  ngOnInit(): void {
    const predmetId = Number(this.route.snapshot.paramMap.get('id'));
    this.predmetService.getById(predmetId).subscribe({
      next: (predmet) => {
        this.termini = predmet?.dokumentiPredmeta?.silabus?.termini ?? [];
      },
      error: (err) => console.error('Greška:', err)
    });
  }
}
