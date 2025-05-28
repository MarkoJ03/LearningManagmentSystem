import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Predmet } from '../../../models/Predmet';
import { GodinaStudijaPredmetService } from '../../../services/godina-studija-predmet.service';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';


@Component({
  selector: 'app-estudent-predmeti',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estudent-predmeti.component.html',
  styleUrls: ['./estudent-predmeti.component.css']
})
export class EstudentPredmetiComponent implements OnInit {
  studentNaGodiniId!: number;
  predmeti: Predmet[] = [];

  constructor(
    private route: ActivatedRoute,
    private studentNaGodiniService: StudentNaGodiniService,
    private gspService: GodinaStudijaPredmetService
  ) {}

  ngOnInit(): void {
    this.studentNaGodiniId = Number(this.route.parent?.snapshot.paramMap.get('id'));

    this.studentNaGodiniService.getById(this.studentNaGodiniId).subscribe({
      next: (studentNaGodini) => {
        const godinaId = studentNaGodini.godinaStudija.id;

        this.gspService.getByGodinaId(godinaId).subscribe({
          next: (veze) => {
            this.predmeti = veze.map((veza: any) => veza.predmet);
          },
          error: (err) => console.error('Greška pri dohvatu predmeta:', err)
        });
      },
      error: (err) => console.error('Greška pri dohvatu studentaNaGodini:', err)
    });
  }
}
