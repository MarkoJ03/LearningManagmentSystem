import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TipPrograma } from '../../../models/TipPrograma';
import { TipProgramaService } from '../../../services/tip-programa.service';
import { BaseTableComponent } from '../../base-table/base-table.component';

@Component({
  selector: 'app-tipovi-programa',
  standalone: true,
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './tipovi-programa.component.html',
  styleUrls: ['./tipovi-programa.component.css']
})
export class TipoviProgramaComponent implements OnInit {
  tipoviPrograma: TipPrograma[] = [];
  kolone: string[] = ['naziv', 'vidljiv'];

  constructor(
    private tipProgramaService: TipProgramaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tipProgramaService.getAll().subscribe({
      next: (res) => (this.tipoviPrograma = res),
      error: (err) => console.error('Greška:', err)
    });
  }

  izmeni(tip: TipPrograma): void {
    this.router.navigate(['/tip-programa/izmeni', tip.id]);
  }

  obrisi(id: number): void {
    this.tipProgramaService.delete(id).subscribe(() => {
      this.tipoviPrograma = this.tipoviPrograma.filter(p => p.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/tip-programa', id]);
  }

  otkazi(): void {
    this.router.navigate(['/tip-programa']);
  }
}
