import { Component, OnInit } from '@angular/core';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';
import { ActivatedRoute } from '@angular/router';
import { StudentNaGodini } from '../../../models/StudentNaGodini';

@Component({
  selector: 'app-estudent-header',
  standalone: true,
  imports: [],
  templateUrl: './estudent-header.component.html',
  styleUrls: ['./estudent-header.component.css']
})
export class EstudentHeaderComponent implements OnInit {

  studentNaGodini!: StudentNaGodini;
  studentNaGodiniId!: number;

  constructor(
    private route: ActivatedRoute,
    private studentNaGodiniService: StudentNaGodiniService
  ) {}

  ngOnInit(): void {
    this.studentNaGodiniId = Number(this.route.snapshot.paramMap.get('id')); 

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
