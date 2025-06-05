import { Component, OnInit } from '@angular/core';
import { Student } from '../../../models/Student';
import { StudentService } from '../../../services/student.service';
import { Router } from '@angular/router';
import { BaseTableComponent } from '../../base-table/base-table.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-studenti',
  standalone: true,
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './studenti.component.html',
  styleUrls: ['./studenti.component.css']
})
export class StudentiComponent implements OnInit {
  studenti: Student[] = [];
  kolone: string[] = ['ime', 'prezime', 'jmbg', 'adresa', 'studentska_sluzba', 'vidljiv'];

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentService.getAll().subscribe(res => {
      this.studenti = res;
    });
  }

  izmeni(student: Student): void {
    this.router.navigate(['/studenti/izmeni', student.id]);
  }

  obrisi(id: number): void {
    this.studentService.delete(id).subscribe(() => {
      this.studenti = this.studenti.filter(s => s.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/studenti', id]);
  }
}
