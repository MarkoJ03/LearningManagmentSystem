import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { Drzava } from '../../../models/Drzava';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { gradService } from '../../../services/grad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DrzavaService } from '../../../services/drzava.service';

@Component({
  selector: 'app-grad-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './grad-forma.component.html',
  styleUrl: './grad-forma.component.css'
})
export class GradFormaComponent {

  
    formaModel: FormaModel | null = null;
    idGrad: number | null = null;
      sveDrzave: Drzava[] = [];



  constructor(
    private gradService: gradService,
    private router: Router,
    private route: ActivatedRoute,
    private drzavaService: DrzavaService
  ) {}

   ngOnInit(): void {

this.drzavaService.getAll().subscribe(drzava => {
      this.sveDrzave = drzava;


 const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idGrad = +idParam;
      this.gradService.getById(this.idGrad).subscribe(grad => {
        this.formaModel = this.kreirajModel(grad);
      });
    } else {
      this.formaModel = this.kreirajModel();
    }


      
})


   
  }


  otkazi(): void {
    this.router.navigate(['/Grad']);
  }



  public sacuvajGrad(vrednosti: any): void {



    if (this.idGrad) {
      this.gradService.update(this.idGrad, vrednosti).subscribe({
        next: () => this.router.navigate(['/Grad']),
        error: err => console.error('Greška pri izmeni adrese:', err)
      });
    } else {
      this.gradService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/Grad']),
        error: err => console.error('Greška pri čuvanju adrese:', err)
      });
    }
  }



 private kreirajModel(podaci?: any): FormaModel {

   let selektovaneDrzave = podaci?.drzava ?? null
  return {
    naziv: podaci ? 'Izmena grada' : 'Dodavanje grada',
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
                naziv: 'drzava',
                labela: 'drzava',
                tip: 'select',
                podrazumevanaVrednost: selektovaneDrzave,
                opcije: this.sveDrzave,
                displayFn: (s: Drzava) =>
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
