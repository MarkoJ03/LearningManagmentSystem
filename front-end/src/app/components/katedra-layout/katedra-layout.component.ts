import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Katedra } from '../../models/Katedra';
import { KatedraService } from '../../services/katedra.service';
import { CommonModule } from '@angular/common';
import { UniverzitetFooterComponent } from '../../../components/shared/univerzitet-footer/univerzitet-footer.component';
import { UniverzitetHeaderComponent } from '../../../components/shared/univerzitet-header/univerzitet-header.component';

@Component({
  selector: 'app-katedra-layout',
  imports: [CommonModule,RouterLink],
  templateUrl: './katedra-layout.component.html',
  styleUrl: './katedra-layout.component.css'
})
export class KatedraLayoutComponent implements OnInit {
  katedra: Katedra | null = null;

  constructor(
    private route: ActivatedRoute,
    private katedraService: KatedraService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.katedraService.getById(id).subscribe({
      next: (data) => this.katedra = data,
      error: (err) => console.error('Greška pri dohvatu katedre:', err)
    });
  }
}