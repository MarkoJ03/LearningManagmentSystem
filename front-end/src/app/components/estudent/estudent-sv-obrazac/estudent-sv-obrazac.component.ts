import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';
import { CommonModule } from '@angular/common';
import { StudentNaGodini } from '../../../models/StudentNaGodini';


@Component({
  selector: 'app-sv-obrazac',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estudent-sv-obrazac.component.html',
  styleUrls: ['./estudent-sv-obrazac.component.css']
})
export class SvObrazacComponent implements OnInit {
studentNaGodini!: StudentNaGodini;
  studentNaGodiniId!: number;

  constructor(
    private route: ActivatedRoute,
    private studentNaGodiniService: StudentNaGodiniService
  ) {}

  ngOnInit(): void {
    this.studentNaGodiniId = Number(this.route.parent?.snapshot.paramMap.get('id')); 
    console.log(this.studentNaGodiniId);

    this.studentNaGodiniService.getById(this.studentNaGodiniId).subscribe({
      next: (studentNaGodini) => {
        this.studentNaGodini= studentNaGodini;
      },
      error: (err) => {
        console.error('Greška pri dohvatanju studenta:', err);
      }
    });
  }
}