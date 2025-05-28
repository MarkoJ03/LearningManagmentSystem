import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentNaGodini } from '../../../models/StudentNaGodini';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';

@Component({
  selector: 'app-estudent-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './estudent-sidebar.component.html',
  styleUrls: ['./estudent-sidebar.component.css']
})
export class EstudentSidebarComponent {

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
