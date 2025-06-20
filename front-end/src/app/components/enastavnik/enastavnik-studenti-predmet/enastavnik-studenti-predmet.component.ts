import { Component } from '@angular/core';
import { StudentNaGodini } from '../../../models/StudentNaGodini';
import { ActivatedRoute } from '@angular/router';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enastavnik-studenti-predmet',
  imports: [CommonModule],
  templateUrl: './enastavnik-studenti-predmet.component.html',
  styleUrl: './enastavnik-studenti-predmet.component.css'
})
export class EnastavnikStudentiPredmetComponent {
studentiNaGodini: StudentNaGodini[] = [];
  predmetId!: number;

  constructor(
    private route: ActivatedRoute,
    private studentNaGodiniService: StudentNaGodiniService
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.predmetId = params['predmetId'];
      this.loadStudentiNaGodini();
    });
  }

  loadStudentiNaGodini(): void {
    this.studentNaGodiniService.getByPredmetId(this.predmetId).subscribe(data => {
      this.studentiNaGodini = data;
    });
  }
}
