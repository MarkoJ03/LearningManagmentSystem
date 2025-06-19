import { Component, OnInit } from '@angular/core';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { Knjiga } from '../../../models/Knjiga';
import { BibliotekaKnjiga } from '../../../models/BibliotekaKnjiga';

import { KnjigaService } from '../../../services/knjiga.service';
import { BibliotekaKnjigaService } from '../../../services/biblioteka-knjiga.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-knjiga-forma',
  standalone: true,
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './knjiga-forma.component.html',
  styleUrls: ['./knjiga-forma.component.css']
})
export class KnjigaFormaComponent implements OnInit {

  formaModel: FormaModel | null = null;
  idKnjiga: number | null = null;

  sveBibliotekeKnjige: BibliotekaKnjiga[] = [];

  constructor(
    private knjigaService: KnjigaService,
    private bibliotekaKnjigaService: BibliotekaKnjigaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bibliotekaKnjigaService.getAll().subscribe(biblioteke => {
      this.sveBibliotekeKnjige = biblioteke;

      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        this.idKnjiga = +idParam;
        this.knjigaService.getById(this.idKnjiga).subscribe(knjiga => {
          this.formaModel = this.kreirajModel(knjiga);
        });
      } else {
        this.formaModel = this.kreirajModel();
      }
    });
  }

  otkazi(): void {
    this.router.navigate(['/knjige']);
  }

  sacuvaj(vrednosti: any): void {
    console.log('Čuvanje knjige:', vrednosti);

    if (this.idKnjiga) {
      this.knjigaService.update(this.idKnjiga, vrednosti).subscribe({
        next: () => this.router.navigate(['/knjige']),
        error: err => console.error('Greška prilikom ažuriranja:', err)
      });
    } else {
      this.knjigaService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/knjige']),
        error: err => console.error('Greška prilikom kreiranja:', err)
      });
    }
  }

  private kreirajModel(podaci?: Knjiga): FormaModel {
    return {
      naziv: podaci ? 'Izmena knjige' : 'Dodavanje knjige',
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
          labela: 'Naziv',
          tip: 'text',
          podrazumevanaVrednost: podaci?.naziv ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'isbn',
          labela: 'ISBN',
          tip: 'text',
          podrazumevanaVrednost: podaci?.isbn ?? '',
          validatori: [Validators.required]
        },
        
        
      ]
    };
  }

}
