import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipProgramaService } from '../../../services/tip-programa.service';
import { TipPrograma } from '../../../models/TipPrograma';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tip-programa-detalji',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tip-programa.component.html',
  styleUrls: ['./tip-programa.component.css']
})
export class TipProgramaComponent implements OnInit {
  tipPrograma: TipPrograma | null = null;

  constructor(
    private route: ActivatedRoute,
    private tipProgramaService: TipProgramaService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.tipProgramaService.getById(id).subscribe({
      next: (data) => (this.tipPrograma = data),
      error: (err) => console.error('Greška:', err)
    });
  }
}
