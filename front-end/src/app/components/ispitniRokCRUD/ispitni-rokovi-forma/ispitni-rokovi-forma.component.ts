import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IshodEvaluacije } from '../../../models/IshodEvaluacije';
import { IspitniRok } from '../../../models/IspitniRok';
import { RealizacijaPredmeta } from '../../../models/RealizacijaPredmeta';
import { IshodEvaluacijeService } from '../../../services/ishod-evaluacije.service';
import { IspitniRokService } from '../../../services/ispitni-rok.service';
import { RealizacijaPredmetaService } from '../../../services/realizacija-predmeta.service';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ispitni-rokovi-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './ispitni-rokovi-forma.component.html',
  styleUrl: './ispitni-rokovi-forma.component.css'
})
export class IspitniRokoviFormaComponent implements OnInit{

  formaModel: FormaModel | null = null;
    idIspitniRok: number | null = null;
    // sviGradovi: Grad[] = [];
    



  constructor(
    private ispitniRokService: IspitniRokService,
    private router: Router,
    private route: ActivatedRoute
    // private gradService: gradService
  ) {}

 ngOnInit(): void {

// this.gradService.getAll().subscribe(grad => {
//       this.sviGradovi = grad;


 const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idIspitniRok = +idParam;
      this.ispitniRokService.getById(this.idIspitniRok).subscribe(drzava => {
        this.formaModel = this.kreirajModel(drzava);
      });
    } else {
      this.formaModel = this.kreirajModel();
    }


      

}



  otkazi(): void {
    this.router.navigate(['/ispitni-rokovi']);
  }

public sacuvaj(vrednosti: any): void {
  console.log('Sacuvaj pozvan sa:', vrednosti);


    if (this.idIspitniRok) {
      this.ispitniRokService.update(this.idIspitniRok, vrednosti).subscribe({
        next: () => this.router.navigate(['/ispitni-rokovi']),
        error: err => console.error('Greška pri izmeni adrese:', err)
      });
    } else {
      this.ispitniRokService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/ispitni-rokovi']),
        error: err => console.error('Greška pri čuvanju adrese:', err)
      });
    }
  }


  private kreirajModel(podaci?: IspitniRok): FormaModel {
    return {
      naziv: podaci ? 'Izmena ispitni-rokovi' : 'Dodavanje ispitni-rokovi',
      polja: [
        ...(podaci ? [{
          naziv: 'id',
          labela: '',
          tip: 'hidden',
          podrazumevanaVrednost: podaci.id
        }] : []),

        {
          naziv: 'vidljiv',
          labela: 'Vidljiv',
          tip: 'checkbox',
          podrazumevanaVrednost: podaci?.vidljiv ?? true
        },
        {
          naziv: 'naziv',
          labela: 'naziv',
          tip: 'text',
          podrazumevanaVrednost: podaci?.naziv ?? null,
   validatori: [Validators.required]
        },
                {
          naziv: 'datumPocetka',
          labela: 'datumPocetka',
          tip: 'date',
          podrazumevanaVrednost: podaci?.datumPocetka ?? null,
          validatori: [Validators.required]
        },
                {
          naziv: 'datumZavrsetka',
          labela: 'datumZavrsetka',
          tip: 'date',
          podrazumevanaVrednost: podaci?.datumZavrsetka ?? null,
          validatori: [Validators.required]
        },

      ]
    };
  }
}