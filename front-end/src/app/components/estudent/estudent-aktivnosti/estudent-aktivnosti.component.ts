import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';
import { GodinaStudijaPredmetService } from '../../../services/godina-studija-predmet.service';

@Component({
  selector: 'app-estudent-aktivnosti',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estudent-aktivnosti.component.html',
  styleUrls: ['./estudent-aktivnosti.component.css']
})
export class EstudentAktivnostiComponent implements OnInit {
  studentNaGodiniId!: number;
  sviPredmeti: { id: number, naziv: string }[] = [];
  evaluacijePoPredmetu: Map<number, any[]> = new Map();
  odabraniPredmetId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private studentNaGodiniService: StudentNaGodiniService,
    private gspService: GodinaStudijaPredmetService
  ) {}

  ngOnInit(): void {
    this.studentNaGodiniId = Number(this.route.parent?.snapshot.paramMap.get('id'));

    this.studentNaGodiniService.getById(this.studentNaGodiniId).subscribe({
      next: (student) => {
        const godinaId = student.godinaStudija?.id;
        const evaluacijeMap = new Map<number, any[]>();

        for (const ev of student.ishodEvaluacije ?? []) {
          const predmet = ev.evaluacijaZnanja?.predmet;
          if (!predmet) continue;

          const id = predmet.id;
          if (!evaluacijeMap.has(id)) evaluacijeMap.set(id, []);

          evaluacijeMap.get(id)?.push({
            bodovi: ev.bodovi,
            napomena: ev.napomena,
            tip: ev.evaluacijaZnanja?.tipEvaluacije?.naziv ??
            'тип непознат',

            vreme: ev.evaluacijaZnanja?.vremePocetka ?? '-',
            nastavnik: `${ev.evaluacijaZnanja?.nastavnik?.ime ?? ''} ${ev.evaluacijaZnanja?.nastavnik?.prezime ?? ''}`
          });
        }

        this.evaluacijePoPredmetu = evaluacijeMap;

        this.gspService.getByGodinaId(godinaId).subscribe({
          next: (veze) => {
            this.sviPredmeti = veze.map(v => v.predmet);
          }
        });
      },
      error: (err) => console.error('Greška pri dohvatu studenta:', err)
    });
  }

  izaberiPredmet(predmetId: number) {
    this.odabraniPredmetId = this.odabraniPredmetId === predmetId ? null : predmetId;
  }

  getNazivPredmeta(id: number): string {
    return this.sviPredmeti.find(p => p.id === id)?.naziv ?? '';
  }
}
