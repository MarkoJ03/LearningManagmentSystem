import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StudijskiProgram } from '../../../models/StudijskiProgram';
import { StudijskiProgramService } from '../../../services/studijski-program.service';
import { BaseTableComponent } from '../../base-table/base-table.component';

@Component({
  selector: 'app-studijski-programi',
  standalone: true,
  imports: [BaseTableComponent,RouterLink],
  templateUrl: './studijski-programi.component.html',
  styleUrls: ['./studijski-programi.component.css']
})
export class StudijskiProgramiComponent implements OnInit {
  programi: StudijskiProgram[] = [];
  kolone: string[] = ['naziv', 'tipPrograma', 'katedra', 'vidljiv'];

  constructor(
    private studijskiProgramService: StudijskiProgramService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studijskiProgramService.getAll().subscribe({
      next: (res) => this.programi = res,
      error: (err) => console.error('Greška pri učitavanju:', err)
    });
  }

  izmeni(program: StudijskiProgram): void {
    this.router.navigate(['/studijski-programi/izmeni', program.id]);
  }

  obrisi(id: number): void {
    this.studijskiProgramService.delete(id).subscribe(() => {
      this.programi = this.programi.filter(p => p.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/studijski-programi', id]);
  }

  otkazi(): void {
    this.router.navigate(['/studijski-programi']);
  }
}
