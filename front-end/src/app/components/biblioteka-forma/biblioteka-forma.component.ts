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
import { BibliotekaKnjigaService } from '../../services/biblioteka-knjiga.service';
import { Biblioteka } from '../../models/Biblioteka';

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
  selektovaneKnjige: Knjiga[] = [];
  kreiranaBiblioteka: Biblioteka | null = null;

  constructor(
    private bibliotekaService: BibliotekaService,
    private studentskaSluzbaService: StudentskaSluzbaService,
    private knjigaService: KnjigaService,
    private router: Router,
    private route: ActivatedRoute,
    private bibliotekaKnjigaService: BibliotekaKnjigaService
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

      const izmenjenaBiblioteka = {
        ...vrednosti,
        knjige: vrednosti.knjige.map((n: Knjiga) => ({
          knjiga: { id: n.id },
          vidljiv: true
        }))
      };

      this.bibliotekaService.update(this.idBiblioteka, izmenjenaBiblioteka).subscribe({
        next: () => this.router.navigate(['/biblioteke']),
        error: err => console.error('Greška pri izmeni bibliteka:', err)
      });
    } else {
      this.bibliotekaService.create(vrednosti).subscribe({
        next: (biblioteka) => {
          this.kreiranaBiblioteka = biblioteka; 

          for (const knjiga of vrednosti.knjige) {
            const veza = {
              id: null, 
              knjiga: knjiga, 
              biblioteka: biblioteka, 
              vidljiv: true
            };

            this.bibliotekaKnjigaService.create(veza).subscribe({
              next: () => console.log("Povezan departman ${departman.id} sa nastavnikom ${nastavnik.id}"),
              error: err => console.error('Greška pri vezivanju departmana:', err)
            });
          }

          

            

          this.router.navigate(['/biblioteke']);
        },
        error: err => console.error('Greška pri čuvanju nastavnika:', err)
      });
    }
  }



  private kreirajModel(podaci?: any): FormaModel {
      

      
  
        let selektovanaSluzba = podaci?.sluzba ?? null;
        let selektovaneKnjige = podaci?.knjige ?? [];
    
      return {
  naziv: podaci ? 'Izmena biblioteke' : "Dodavanje biblioteke",
  polja: [{
          naziv: 'studentskaSluzba',
          labela: 'StudentskaSluzba',
          tip: 'select',
          podrazumevanaVrednost: selektovanaSluzba,
          opcije: this.sveStudentskeSluzbe,
          displayFn: (s: StudentskaSluzba) =>
            `${s.id}`,
          validatori: [Validators.required]
        },{
  naziv: 'knjige',
  labela: 'Knjige',
  tip: 'checkbox-list',
  podrazumevanaVrednost: selektovaneKnjige,
  opcije: this.sveKnjige,
  displayFn: (k: Knjiga) => k.naziv
}]
};
  }
}
