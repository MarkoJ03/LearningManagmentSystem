import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdresaService } from '../../services/adresa.service';
import { FormaModel } from '../genericka-forma/FormaModel';
import { GenerickaFormaComponent } from '../genericka-forma/genericka-forma.component';

@Component({
  selector: 'app-adresa-forma',
  standalone: true,
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './adresa-forma.component.html',
  styleUrl: './adresa-forma.component.css'
})
export class AdresaFormaComponent {

  formaModel: FormaModel | null = null;
  idAdrese: number | null = null;

  constructor(
    private adresaService: AdresaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idAdrese = +idParam;
      this.adresaService.getById(this.idAdrese).subscribe(adresa => {
        this.formaModel = this.kreirajModel(adresa);
      });
    } else {
      this.formaModel = this.kreirajModel();
    }
  }

  otkazi(): void {
    this.router.navigate(['/adrese']);
  }

  public sacuvajAdresa(vrednosti: any): void {
    if (this.idAdrese) {
      this.adresaService.update(this.idAdrese, vrednosti).subscribe({
        next: () => this.router.navigate(['/adrese']),
        error: err => console.error('Greška pri izmeni adrese:', err)
      });
    } else {
      this.adresaService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/adrese']),
        error: err => console.error('Greška pri čuvanju adrese:', err)
      });
    }
  }

 private kreirajModel(podaci?: any): FormaModel {
  return {
    naziv: podaci ? 'Izmena adrese' : 'Dodavanje adrese',
    polja: [
      ...(podaci ? [{
        naziv: 'id',
        labela: '',
        tip: 'hidden',
        podrazumevanaVrednost: podaci.id
      }] : []),
      {
        naziv: 'broj',
        labela: 'Broj',
        tip: 'text',
        podrazumevanaVrednost: podaci?.broj ?? '',
        validatori: [Validators.required]
      },
      {
        naziv: 'drzava',
        labela: 'Država',
        tip: 'text',
        podrazumevanaVrednost: podaci?.drzava ?? '',
        validatori: [Validators.required]
      },
      {
        naziv: 'grad',
        labela: 'Grad',
        tip: 'text',
        podrazumevanaVrednost: podaci?.grad ?? '',
        validatori: [Validators.required]
      },
      {
        naziv: 'ulica',
        labela: 'Ulica',
        tip: 'text',
        podrazumevanaVrednost: podaci?.ulica ?? '',
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
