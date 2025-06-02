import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';
import { GodinaStudijaPredmetService } from '../../../services/godina-studija-predmet.service';

@Component({
  selector: 'app-estudent-prijava-ispita',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estudent-prijava-ispita.component.html',
  styleUrls: ['./estudent-prijava-ispita.component.css']
})
export class EstudentPrijavaIspitaComponent implements OnInit {
  studentNaGodiniId!: number;
  prijavljiviPredmeti: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private studentNaGodiniService: StudentNaGodiniService,
    private gspService: GodinaStudijaPredmetService
  ) {}

  ngOnInit(): void {
    this.studentNaGodiniId = Number(this.route.parent?.snapshot.paramMap.get('id'));

    this.studentNaGodiniService.getById(this.studentNaGodiniId).subscribe({
      next: (student) => {
        const godinaId = student.godinaStudija.id;
        const polozeniPredmeti = new Set<number>();

        for (const ev of student.ishodEvaluacije ?? []) {
          const predmet = ev.evaluacijaZnanja?.predmet;
          const ishod = ev.ishodPredmeta?.ocena;

          if (predmet && ishod) {
            polozeniPredmeti.add(predmet.id);
          }
        }

        // Sada dohvatamo sve predmete iz godine studija
        this.gspService.getByGodinaId(godinaId).subscribe({
          next: (veze) => {
            this.prijavljiviPredmeti = veze
              .map(v => v.predmet)
              .filter(p => !polozeniPredmeti.has(p.id));
          }
        });
      },
      error: (err) => console.error('Greška pri dohvatu studenta:', err)
    });
  }

  prijavi(predmetId: number) {
    alert(`Испит за предмет са ID ${predmetId} је пријављен!`);
    // Ovde ćeš kasnije dodati poziv za prijavu ispita
  }
}
