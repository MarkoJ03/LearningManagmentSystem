import { Component, OnInit } from '@angular/core';
import { BaseTableComponent } from '../../base-table/base-table.component';
import { Router, RouterLink } from '@angular/router';
import { StudentNaGodini } from '../../../models/StudentNaGodini';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';

@Component({
  selector: 'app-studenti-na-godini',
  standalone: true,
  imports: [BaseTableComponent,RouterLink],
  templateUrl: './studenti-na-godini.component.html',
  styleUrls: ['./studenti-na-godini.component.css']
})
export class StudentiNaGodiniComponent implements OnInit {
  studentiNaGodini: StudentNaGodini[] = [];
  kolone: string[] = ['brojIndeksa', 'datumUpisa', 'student', 'godinaStudija', 'grupaStudenata', 'vidljiv'];

  constructor(
    private studentNaGodiniService: StudentNaGodiniService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentNaGodiniService.getAll().subscribe({
      next: (res) => { this.studentiNaGodini = res; },
      error: (err) => console.error('Greška:', err)
    });
  }

  izmeni(studentNaGodini: StudentNaGodini): void {
    this.router.navigate(['/student-na-godini/izmeni', studentNaGodini.id]);
  }

  obrisi(id: number): void {
    this.studentNaGodiniService.delete(id).subscribe(() => {
      this.studentiNaGodini = this.studentiNaGodini.filter(s => s.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/student-na-godini', id]);
  }

  otkazi(): void {
    this.router.navigate(['/student-na-godini']);
  }
}
