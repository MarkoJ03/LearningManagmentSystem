import { Component, OnInit } from '@angular/core';
import { StudentskaSluzba } from '../../models/StudentskaSluzba';
import { FormaModel } from '../genericka-forma/FormaModel';
import { GenerickaFormaComponent } from '../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Knjiga } from '../../models/Knjiga';
import { ActivatedRoute, Router } from '@angular/router';
import { BibliotekaService } from '../../services/biblioteka.service';
import { StudentskaSluzbaService } from '../../services/studentska-sluzba.service';
import { KnjigaService } from '../../services/knjiga.service';

@Component({
  selector: 'app-biblioteka-forma',
  imports: [GenerickaFormaComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './biblioteka-forma.component.html',
  styleUrls: ['./biblioteka-forma.component.css']
})
export class BibliotekaFormaComponent implements OnInit {

  formaModel: FormaModel | null = null;
  sveStudentskeSluzbe: StudentskaSluzba[] = [];
  sveKnjige: Knjiga[] = [];
  idBiblioteka: number | null = null;

  constructor(
    private bibliotekaService: BibliotekaService,
    private studentskaSluzbaService: StudentskaSluzbaService,
    private knjigaService: KnjigaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.studentskaSluzbaService.getAll().subscribe(sluzbe => {
      this.sveStudentskeSluzbe = sluzbe;

      this.knjigaService.getAll().subscribe(knjige => {
        this.sveKnjige = knjige;

        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
          this.idBiblioteka = +idParam;
          this.bibliotekaService.getById(this.idBiblioteka).subscribe(biblioteka => {
            this.formaModel = this.kreirajModel(biblioteka);
          });
        } else {
          this.formaModel = this.kreirajModel();
        }
      });
    });
  }


  
  otkazi(): void {
    this.router.navigate(['/biblioteke']);
  }

public sacuvajBiblioteku(vrednosti: any): void {
  if (this.idBiblioteka) {
    this.bibliotekaService.update(this.idBiblioteka, vrednosti).subscribe({
      next: () => this.router.navigate(['/biblioteke']),
      error: err => console.error('Greška pri izmeni biblioteke:', err)
    });
  } else {
    this.bibliotekaService.create(vrednosti).subscribe({
      next: (biblioteka) => {
        console.log('Kreirana biblioteka:', biblioteka);
        console.log('Sve knjige (log posle kreiranja):', this.sveKnjige);
        this.router.navigate(['/biblioteke']);
      },
      error: err => console.error('Greška pri čuvanju biblioteke:', err)
    });
  }
}


  private kreirajModel(podaci?: any): FormaModel {
      let selektovanaSluzba = null; 
      let selektovaneKnjige = null;

      if (podaci?.sluzba && podaci?.knjiga) {

  
        const selektovanaSluzba = podaci?.sluzba ?? null;
        const selektovaneKnjige = podaci?.knjiga ?? null
    }
      return {
  naziv: podaci ? 'Izmena biblioteke' : "Dodavanje biblioteke",
  polja: [{
          naziv: 'sluzba',
          labela: 'StudentskaSluzba',
          tip: 'select',
          podrazumevanaVrednost: selektovanaSluzba,
          opcije: this.sveStudentskeSluzbe,
          displayFn: (s: StudentskaSluzba) =>
            `${s.id}`,
          validatori: [Validators.required]
        },{
          naziv: 'knjiga',
          labela: 'Knjiga',
          tip: 'select',
          podrazumevanaVrednost: selektovaneKnjige,
          opcije: this.sveKnjige,
          displayFn: (k: Knjiga) =>
            `${k.naziv}`,
          validatori: [Validators.required]
        }]
};
  }
}
