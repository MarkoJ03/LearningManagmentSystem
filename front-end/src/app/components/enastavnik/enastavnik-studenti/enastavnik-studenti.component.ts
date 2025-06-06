import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';
import { StudentNaGodini } from '../../../models/StudentNaGodini';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-enastavnik-studenti',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './enastavnik-studenti.component.html',
  styleUrls: ['./enastavnik-studenti.component.css']
})
export class EnastavnikStudentiComponent implements OnInit {
  studenti: StudentNaGodini[] = [];
  izabraniStudent?: StudentNaGodini;

  constructor(private studentService: StudentNaGodiniService) {}

  ngOnInit(): void {
    this.studentService.getAll().subscribe({
      next: (data) => this.studenti = data,
      error: (err) => console.error('Greška pri dohvatu studenata:', err)
    });
  }

  prikaziDetalje(student: StudentNaGodini): void {
    if (this.izabraniStudent === student) {
      this.izabraniStudent = undefined; 
    } else {
      this.izabraniStudent = student;
    }
  }
}
