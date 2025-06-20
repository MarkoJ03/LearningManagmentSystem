import { Component } from '@angular/core';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { Grad } from '../../../models/Grad';
import { DrzavaService } from '../../../services/drzava.service';
import { Router, ActivatedRoute } from '@angular/router';
import { gradService } from '../../../services/grad.service';

@Component({
  selector: 'app-drzava-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './drzava-forma.component.html',
  styleUrl: './drzava-forma.component.css'
})
export class DrzavaFormaComponent {

  formaModel: FormaModel | null = null;
    idDrzava: number | null = null;
    sviGradovi: Grad[] = [];
    



  constructor(
    private drzavaService: DrzavaService,
    private router: Router,
    private route: ActivatedRoute,
    private gradService: gradService
  ) {}

 ngOnInit(): void {

this.gradService.getAll().subscribe(grad => {
      this.sviGradovi = grad;


 const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idDrzava = +idParam;
      this.drzavaService.getById(this.idDrzava).subscribe(drzava => {
        this.formaModel = this.kreirajModel(drzava);
      });
    } else {
      this.formaModel = this.kreirajModel();
    }


      
})
}



  otkazi(): void {
    this.router.navigate(['/Drzava']);
  }

public sacuvajDrzavu(vrednosti: any): void {



    if (this.idDrzava) {
      this.drzavaService.update(this.idDrzava, vrednosti).subscribe({
        next: () => this.router.navigate(['/Drzava']),
        error: err => console.error('Greška pri izmeni adrese:', err)
      });
    } else {
      this.drzavaService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/Drzava']),
        error: err => console.error('Greška pri čuvanju adrese:', err)
      });
    }
  }


  private kreirajModel(podaci?: any): FormaModel {

   let selektovaniGrad = podaci?.gradovi ?? null
  return {
    naziv: podaci ? 'Izmena drzave' : 'Dodavanje drzave',
    polja: [
      ...(podaci ? [{
        naziv: 'id',
        labela: '',
        tip: 'hidden',
        podrazumevanaVrednost: podaci.id
      }] : []),
      {
        naziv: 'naziv',
        labela: 'naziv',
        tip: 'text',
        podrazumevanaVrednost: podaci?.naziv ?? '',
        validatori: [Validators.required]
      },
      
      {
                naziv: 'gradovi',
                labela: 'gradovi',
                tip: 'checkbox-list',
                podrazumevanaVrednost: selektovaniGrad,
                opcije: this.sviGradovi,
                displayFn: (s: Grad) =>
                  s.naziv,
                validatori: [Validators.required]
              },
      
      {
        naziv: 'vidljiv',
        labela: 'Vidljiv',
        tip: 'checkbox',
        podrazumevanaVrednost: podaci?.vidljiv ?? true,
        validatori: []
      }
    ]
  };
}

  }