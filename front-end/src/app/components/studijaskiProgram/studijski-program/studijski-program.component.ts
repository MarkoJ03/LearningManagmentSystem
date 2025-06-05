import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudijskiProgram } from '../../../models/StudijskiProgram';
import { StudijskiProgramService } from '../../../services/studijski-program.service';

@Component({
  selector: 'app-studijski-program',
  standalone: true,
  templateUrl: './studijski-program.component.html',
  styleUrls: ['./studijski-program.component.css']
})
export class StudijskiProgramComponent implements OnInit {
  program: StudijskiProgram | null = null;

  constructor(
    private route: ActivatedRoute,
    private studijskiProgramService: StudijskiProgramService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.studijskiProgramService.getById(id).subscribe(data => {
      this.program = data;
    });
  }
}
