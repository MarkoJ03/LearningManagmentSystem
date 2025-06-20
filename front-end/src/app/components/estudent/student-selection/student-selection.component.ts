import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { CommonModule } from '@angular/common';
import { UniverzitetHeaderComponent } from '../../../../components/shared/univerzitet-header/univerzitet-header.component';
import { UniverzitetFooterComponent } from '../../../../components/shared/univerzitet-footer/univerzitet-footer.component';

@Component({
  selector: 'app-student-selection',
  imports: [CommonModule, RouterLink,UniverzitetHeaderComponent, UniverzitetFooterComponent],
  templateUrl: './student-selection.component.html',
  styleUrl: './student-selection.component.css'
})
export class StudentSelectionComponent {

  student: any;
  studentId!: number;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.getById(this.studentId).subscribe((data) => {
      this.student = data;
    });
  }

  izaberiIndeks(studentNaGodiniId: number) {
    this.router.navigate([`/studentNaGodini/${studentNaGodiniId}/estudent/objave`]);
  }
}
