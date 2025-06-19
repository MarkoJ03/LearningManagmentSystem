import { Component, OnInit } from '@angular/core';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { GodinaStudija } from '../../../models/GodinaStudija';
import { GodinaStudijaService } from '../../../services/godina-studija.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudijskiProgram } from '../../../models/StudijskiProgram';
import { StudijskiProgramService } from '../../../services/studijski-program.service';
import { TipPrograma } from '../../../models/TipPrograma'; 
import { StudentNaGodini } from '../../../models/StudentNaGodini';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';

@Component({
  selector: 'app-godina-studija-forma',
  standalone: true,
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './godina-studija-forma.component.html',
  styleUrls: ['./godina-studija-forma.component.css']
})
export class GodinaStudijaFormaComponent implements OnInit {
  formaModel: FormaModel | null = null;
  idGodinaStudija: number | null = null;
  svistudijskiProgrami: StudijskiProgram[] = [];
  sviStudentiNaGodini: StudentNaGodini[] = [];
  

  constructor(
    private service: GodinaStudijaService,
    private studijskiProgramService: StudijskiProgramService,
    private studentNaGodiniService: StudentNaGodiniService,
    
    private router: Router,
    private route: ActivatedRoute
  ) {}
ngOnInit(): void {
    this.studentNaGodiniService.getAll().subscribe(studenti => {
      this.sviStudentiNaGodini = studenti;


 this.studijskiProgramService.getAll().subscribe(programi => {
    
      this.svistudijskiProgrami = programi;

        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
          this.idGodinaStudija = +idParam;
          this.service.getById(this.idGodinaStudija).subscribe(godine => {
            this.formaModel = this.kreirajModel(godine);

            
          });
        } else {
          this.formaModel = this.kreirajModel();
        }
      });

    });

   
    
  }

  otkazi(): void {
    this.router.navigate(['/godine-studija']);
  }

  sacuvaj(vrednosti: any): void {
    

    if (this.idGodinaStudija) {

       const izmenjenaGodinaStudija = {
        ...vrednosti,
        studentiNaGodini: vrednosti.studentiNaGodini?.map((sp: StudentNaGodini) => ({
          id: sp.id
        }))}


      this.service.update(this.idGodinaStudija, izmenjenaGodinaStudija).subscribe({
        next: () => this.router.navigate(['/godine-studija']),
        error: err => console.error('Greška:', err)
      });
    } else {

      const izmenjenaGodinaStudija = {
        ...vrednosti,
        studentiNaGodini: vrednosti.studentiNaGodini?.map((sp: StudentNaGodini) => ({
          id: sp.id
        }))}

      this.service.create(izmenjenaGodinaStudija).subscribe({
        
        
        
        next: () => {
          console.log(izmenjenaGodinaStudija);
          this.router.navigate(['/godine-studija'])},
        error: err => console.error('Greška:', err)
      });
    }
  }

  private kreirajModel(podaci?: any): FormaModel { 
    const selektovanaGodina = podaci?.godina ?? null;
    const selektovaniStudijskiProgram = podaci?.studijskiProgram ?? null;
    
    const selektovaniStudentiNaGodini = podaci?.studentiNaGodini ?? [];

    return {
      naziv: podaci && podaci.id ? 'Izmena godine studija' : 'Dodavanje godine studija',
      polja: [
        ...(podaci && podaci.id ? [{
          naziv: 'id',
          labela: '',
          tip: 'hidden',
          podrazumevanaVrednost: podaci.id
        }] : []),
        {
          naziv: 'godina',
          labela: 'Godina',
          tip: 'text',
          podrazumevanaVrednost: podaci?.godina ?? null,
          displayFn: (godina: string) => godina,
          validatori: [Validators.required]
        },
       
         {
          naziv: 'studijskiProgram',
          labela: 'studijskiProgram',
          tip: 'select',
          podrazumevanaVrednost: selektovaniStudijskiProgram,
          opcije: this.svistudijskiProgrami,
          displayFn: (p: StudijskiProgram) => p.naziv ,
          validatori: [Validators.required]
        },
        {
          naziv: 'studentiNaGodini',
          labela: 'studentiNaGodini',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovaniStudentiNaGodini,
          opcije: this.sviStudentiNaGodini,
          displayFn: (p: StudentNaGodini) => p.brojIndeksa ,
          validatori: [Validators.required]
        }
        
      ]
    };
  }
}
