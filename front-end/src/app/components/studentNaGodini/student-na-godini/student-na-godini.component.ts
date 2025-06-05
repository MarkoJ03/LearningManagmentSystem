import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentNaGodini } from '../../../models/StudentNaGodini';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';

@Component({
  selector: 'app-student-na-godini',
  standalone: true,
  templateUrl: './student-na-godini.component.html',
  styleUrls: ['./student-na-godini.component.css']
})
export class StudentNaGodiniComponent implements OnInit {
  studentNaGodini: StudentNaGodini | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentNaGodiniService: StudentNaGodiniService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentNaGodiniService.getById(+id).subscribe({
        next: (data) => { this.studentNaGodini = data; },
        error: (err) => console.error('Greška:', err)
      });
    }
  }

  nazad(): void {
    this.router.navigate(['/student-na-godini']);
  }
}
