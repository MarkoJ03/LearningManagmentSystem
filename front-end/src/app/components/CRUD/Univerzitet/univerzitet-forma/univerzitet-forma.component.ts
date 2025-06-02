import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerickaFormaComponent } from '../../../genericka-forma/genericka-forma.component';
import { FormaModel } from '../../../genericka-forma/FormaModel';
import { UniverzitetService } from '../../../../services/univerzitet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Fakultet } from '../../../../models/Fakultet';
import { FakultetService } from '../../../../services/fakultet.service';
import { Univerzitet } from '../../../../models/Univerzitet';

@Component({
  selector: 'app-univerzitet-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './univerzitet-forma.component.html',
  styleUrl: './univerzitet-forma.component.css'
})
export class UniverzitetFormaComponent {
  formaModel: FormaModel | null = null;
  idUniverziteta: number | null = null;
  sviFakulteti: Fakultet[] = [];
  selektovaniFakulteti: Fakultet[] = [];
  kreiraniUniverzitet: Univerzitet | null = null;

  constructor(
    private univerzitetService: UniverzitetService,
    private fakultetService: FakultetService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fakultetService.getAll().subscribe(fakulteti => {
      this.sviFakulteti = fakulteti;

      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        this.idUniverziteta = +idParam;
        this.univerzitetService.getById(this.idUniverziteta).subscribe(univerzitet => {
          this.formaModel = this.kreirajModel(univerzitet);
        });
      } else {
        this.formaModel = this.kreirajModel();
      }
    })
  }

  otkazi(): void {
    this.router.navigate(['/univerziteti']);
  }

  public sacuvajUniverzitet(vrednosti: any): void {
    if (this.idUniverziteta) {
      this.univerzitetService.update(this.idUniverziteta, vrednosti).subscribe({
        next: () => this.router.navigate(['/univerziteti']),
        error: err => console.error('Greška pri izmeni univerziteta:', err)
      });
    } else {
      this.univerzitetService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/univerziteti']),
        error: err => console.error('Greška pri čuvanju univerziteta:', err)
      });
    }
  }

  private kreirajModel(podaci?: any): FormaModel {
    //let selektovaniFakulteti = null;
    //if (podaci?.fakultet) {
    let selektovaniFakulteti = podaci?.fakultet ?? [];
    //}

    return {
      naziv: podaci ? 'Izmena univerziteta' : 'Dodavanje univerziteta',
      polja: [
        {
          naziv: 'naziv',
          labela: 'Naziv',
          tip: 'text',
          podrazumevanaVrednost: podaci?.naziv ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'adresa',
          labela: 'Adresa',
          tip: 'text',
          podrazumevanaVrednost: podaci?.adresa ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'datumOsnivanja',
          labela: 'Datum osnivanja',
          tip: 'date',
          podrazumevanaVrednost: podaci?.datumOsnivanja ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'fakulteti',
          labela: 'Fakulteti',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovaniFakulteti,
          opcije: this.sviFakulteti,
          displayFn: (f: Fakultet) => f.naziv,
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
