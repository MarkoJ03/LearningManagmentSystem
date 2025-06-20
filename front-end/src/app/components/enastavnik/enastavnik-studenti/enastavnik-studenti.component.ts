import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';
import { StudentNaGodini } from '../../../models/StudentNaGodini';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enastavnik-studenti',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './enastavnik-studenti.component.html',
  styleUrls: ['./enastavnik-studenti.component.css']
})
export class EnastavnikStudentiComponent implements OnInit {
  studenti: StudentNaGodini[] = [];
  filteredStudenti: StudentNaGodini[] = [];
  izabraniStudent?: StudentNaGodini;
  searchTerm: string = '';

  constructor(private studentService: StudentNaGodiniService) {}

  ngOnInit(): void {
    this.studentService.getAll().subscribe({
      next: (data) => {
        this.studenti = data;
        this.filteredStudenti = data;
      },
      error: (err) => console.error('Greška pri dohvatu studenata:', err)
    });
  }

  filterStudenti(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredStudenti = this.studenti.filter(s =>
      s.student.ime.toLowerCase().includes(term) ||
      s.student.prezime.toLowerCase().includes(term) ||
      s.brojIndeksa.toLowerCase().includes(term)
    );
  }

  prikaziDetalje(student: StudentNaGodini): void {
    this.izabraniStudent = this.izabraniStudent === student ? undefined : student;
  }
}
