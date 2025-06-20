import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';
import { GodinaStudijaPredmetService } from '../../../services/godina-studija-predmet.service';
import { IspitniRokService } from '../../../services/ispitni-rok.service';
import { PredmetService } from '../../../services/predmet.service';
import { IspitniRok } from '../../../models/IspitniRok';

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
  ispitniRokovi: any[] = [];
  expandovaniRokovi: { [rokId: number]: boolean } = {};
  rok:any;
  predmet:any;

  constructor(
    private route: ActivatedRoute,
    private studentNaGodiniService: StudentNaGodiniService,
    private gspService: GodinaStudijaPredmetService,
    private iService: IspitniRokService,
    private pService: PredmetService
  ) {}

toggleRok(rokId: number): void {
  this.expandovaniRokovi[rokId] = !this.expandovaniRokovi[rokId];
}

  ngOnInit(): void {
    this.studentNaGodiniId = Number(this.route.parent?.snapshot.paramMap.get('id'));

    this.iService.getAll().subscribe({
      next: (rokovi) =>{
        this.ispitniRokovi=rokovi;
      }
      ,
      error: (err) => console.error('Greška pri dohvatu rokova:', err)
    });
  

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

  prijavi(predmetId: number, rokId: number) {

    // this.iService.getById(rokId).subscribe({
    //   next:(rok) => {
    //     this.rok = rok;
    //   }
    // });
    //     this.pService.getById(predmetId).subscribe({
    //   next:(predmet) => {
    //     this.predmet = predmet;
    //   }
    // })
    alert(`ispit ID ${predmetId} je prijavljen u roku ID ${rokId}`);

}

rokJeAktivan(rok: IspitniRok): boolean {
  const danas = new Date();
  const pocetak = new Date(rok.datumPocetka);
  const kraj = new Date(rok.datumZavrsetka);
  return danas >= pocetak && danas <= kraj;
}


}
