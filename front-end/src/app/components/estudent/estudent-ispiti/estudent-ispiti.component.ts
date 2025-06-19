import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-estudent-ispiti',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './estudent-ispiti.component.html',
  styleUrls: ['./estudent-ispiti.component.css']
})
export class EstudentIspitiComponent implements OnInit {
  studentNaGodiniId!: number;
  ocene: any[] = [];
  filtriraneOcene: any[] = [];
  prosecnaOcena: number = 0;
  ukupnoEspb: number = 0;
  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private studentNaGodiniService: StudentNaGodiniService
  ) {}

  ngOnInit(): void {
    this.studentNaGodiniId = Number(this.route.parent?.snapshot.paramMap.get('id'));

    this.studentNaGodiniService.getById(this.studentNaGodiniId).subscribe({
      next: (student) => {
        const predmetMap = new Map<number, any>();

        for (const ev of student.ishodEvaluacije ?? []) {
          const predmet = ev.evaluacijaZnanja?.predmet;
          const ocena = ev.ishodPredmeta?.ocena;

          if (!predmet || !ocena) continue;

          const id = predmet.id;

          if (!predmetMap.has(id)) {
            predmetMap.set(id, {
              naziv: predmet.naziv,
              espb: predmet.esbp,
              tip: predmet.obavezan ? 'обавезан' : 'изборни',
              bodovi: ev.bodovi,
              ocena: ocena,
              nastavnik: `${ev.evaluacijaZnanja?.nastavnik?.ime ?? ''} ${ev.evaluacijaZnanja?.nastavnik?.prezime ?? ''}`
            });
          } else {
            const postojeci = predmetMap.get(id);
            postojeci.bodovi += ev.bodovi;
          }
        }

        this.ocene = Array.from(predmetMap.values());
        this.filtriraj(); // primeni filter odmah

        const espbSum = this.ocene.reduce((sum, o) => sum + o.espb, 0);
        const ocenaSum = this.ocene.reduce((sum, o) => sum + o.ocena, 0);

        this.ukupnoEspb = espbSum;
        this.prosecnaOcena = this.ocene.length > 0 ? +(ocenaSum / this.ocene.length).toFixed(2) : 0;
      },
      error: (err) => console.error('Greška pri dohvatu studenta:', err)
    });
  }

  filtriraj(): void {
    const termin = this.searchTerm.toLowerCase();
    this.filtriraneOcene = this.ocene.filter(o =>
      Object.values(o).join(' ').toLowerCase().includes(termin)
    );
  }
}
