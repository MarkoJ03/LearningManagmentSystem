import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentNaGodiniService } from '../../services/student-na-godini.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {

 studentNaGodini: any;
  studentNaGodiniId!: number;

  constructor(
    private route: ActivatedRoute,
    private studentNaGodiniService: StudentNaGodiniService
  ) {}

  ngOnInit(): void {
    this.studentNaGodiniId = Number(this.route.snapshot.paramMap.get('id'));
    this.studentNaGodiniService.getById(this.studentNaGodiniId).subscribe((data) => {
      this.studentNaGodini = data;
    });
  }
}
