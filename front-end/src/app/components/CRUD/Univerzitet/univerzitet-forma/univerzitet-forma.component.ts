import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerickaFormaComponent } from '../../../genericka-forma/genericka-forma.component';
import { FormaModel } from '../../../genericka-forma/FormaModel';
import { UniverzitetService } from '../../../../services/univerzitet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Fakultet } from '../../../../models/Fakultet';
import { FakultetService } from '../../../../services/fakultet.service';
import { Univerzitet } from '../../../../models/Univerzitet';
import { Adresa } from '../../../../models/Adresa';
import { AdresaService } from '../../../../services/adresa.service';

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
  kreiraniUniverzitet: Univerzitet | null = null;
  sveAdrese: Adresa[] = [];

  constructor(
    private univerzitetService: UniverzitetService,
    private fakultetService: FakultetService,
    private adresaService: AdresaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fakultetService.getAll().subscribe(fakulteti => {
      this.sviFakulteti = fakulteti;

      this.adresaService.getAll().subscribe(adrese => {
        this.sveAdrese = adrese;

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

    })
  }

  otkazi(): void {
    this.router.navigate(['/univerziteti']);
  }

  public sacuvajUniverzitet(vrednosti: any): void {
    const adresaToSend = vrednosti.adresa ? { id: vrednosti.adresa.id } : null;

    const fakultetiToSend = vrednosti.fakulteti ? vrednosti.fakulteti.map((fakultet: Fakultet) => {
      if (fakultet.id) {
        return { id: fakultet.id };
      } else {
        return {
            naziv: fakultet.naziv,
            vidljiv: fakultet.vidljiv
        };
      }
    }) : [];

    const finalUniverzitetDto = {
      ...vrednosti, 
      adresa: adresaToSend,
      fakulteti: fakultetiToSend 
    };

    if (!this.idUniverziteta) {
      delete finalUniverzitetDto.id;
    }

    if (this.idUniverziteta) {
      this.univerzitetService.update(this.idUniverziteta, finalUniverzitetDto).subscribe({
        next: () => this.router.navigate(['/univerziteti']),
        error: err => console.error('Greška pri izmeni univerziteta:', err)
      });
    } else {
      this.univerzitetService.create(finalUniverzitetDto).subscribe({
        next: () => this.router.navigate(['/univerziteti']),
        error: err => console.error('Greška pri čuvanju univerziteta:', err)
      });
    }
  }

  private kreirajModel(podaci?: any): FormaModel {
    let selektovaniFakulteti = podaci?.fakultet ?? [];
    let selektovanaAdresa = podaci?.adresa ?? null;

    return {
      naziv: podaci ? 'Izmena univerziteta' : 'Dodavanje univerziteta',
      polja: [
        ...(podaci ? [{
          naziv: 'id',
          labela: '',
          tip: 'hidden',
          podrazumevanaVrednost: podaci.id
        }] : []),
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
          tip: 'select',
          podrazumevanaVrednost: selektovanaAdresa,
          opcije: this.sveAdrese,
          displayFn: (a: Adresa) => `${a.ulica} ${a.broj}`,
          validatori: [Validators.required]
        },
        {
          naziv: 'datumOsnivanja',
          labela: 'Datum osnivanja',
          tip: 'date',
          podrazumevanaVrednost: podaci?.datumOsnivanja ?? null,
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
          naziv: 'email',
          labela: 'Email',
          tip: 'text',
          podrazumevanaVrednost: podaci?.email ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'kontakt',
          labela: 'Kontakt',
          tip: 'text',
          podrazumevanaVrednost: podaci?.kontakt ?? '',
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
