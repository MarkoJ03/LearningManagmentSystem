import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentNaGodini } from '../../../models/StudentNaGodini';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';

@Component({
  selector: 'app-estudent-podaci-o-studentu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estudent-podaci-o-studentu.component.html',
  styleUrl: './estudent-podaci-o-studentu.component.css'
})
export class EstudentPodaciOStudentuComponent {

studentNaGodini!: StudentNaGodini;
  studentNaGodiniId!: number;

  constructor(
    private route: ActivatedRoute,
    private studentNaGodiniService: StudentNaGodiniService
  ) {}

  ngOnInit(): void {
    this.studentNaGodiniId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    this.studentNaGodiniService.getById(this.studentNaGodiniId).subscribe({
      next: (data) => {
        this.studentNaGodini = data;
      },
      error: (err) => {
        console.error('Greška pri dohvatanju podataka o studentu:', err);
      }
    });
  }
}