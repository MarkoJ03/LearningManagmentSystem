import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerickaFormaComponent } from '../../../genericka-forma/genericka-forma.component';
import { FormaModel } from '../../../genericka-forma/FormaModel';
import { TipZvanja } from '../../../../models/TipZvanja';
import { NaucnaOblast } from '../../../../models/NaucnaOblast';
import { Nastavnik } from '../../../../models/Nastavnik';
import { ZvanjeService } from '../../../../services/zvanje.service';
import { TipZvanjaService } from '../../../../services/tip-zvanja.service';
import { NaucnaOblastService } from '../../../../services/naucna-oblast.service';
import { NastavnikService } from '../../../../services/nastavnik.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-zvanje-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './zvanje-forma.component.html',
  styleUrl: './zvanje-forma.component.css'
})
export class ZvanjeFormaComponent {
  formaModel: FormaModel | null = null;
  idZvanja: number | null = null;
  selektovanTipZvanja: TipZvanja | null = null;
  sviTipoviZvanja: TipZvanja[] = [];
  selektovanaNaucnaOblast: NaucnaOblast | null = null;
  sveNaucneOblasti: NaucnaOblast[] = [];
  selektovaniNastavnik: Nastavnik | null = null;
  sviNastavnici: Nastavnik[] = [];

  constructor(
    private zvanjeService: ZvanjeService,
    private tipZvanjaService: TipZvanjaService,
    private naucnaOblastService: NaucnaOblastService,
    private nastavnikService: NastavnikService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.tipZvanjaService.getAll().subscribe(tipoviZvanja => {
      this.sviTipoviZvanja = tipoviZvanja;

      this.naucnaOblastService.getAll().subscribe(naucneOblasti => {
        this.sveNaucneOblasti = naucneOblasti;

        this.nastavnikService.getAll().subscribe(nastavnici => {
          this.sviNastavnici = nastavnici;

          const idParam = this.route.snapshot.paramMap.get('id');
          if (idParam) {
            this.idZvanja = +idParam;
            this.zvanjeService.getById(this.idZvanja).subscribe(terminNastave => {
              this.formaModel = this.kreirajModel(terminNastave);
            });
          } else {
            this.formaModel = this.kreirajModel();
          }
        })
      })
    })
  }

  otkazi(): void {
    this.router.navigate(['/zvanja']);
  }

  public sacuvajZvanje(vrednosti: any): void {
    if (this.idZvanja) {
      this.zvanjeService.update(this.idZvanja, vrednosti).subscribe({
        next: () => this.router.navigate(['/zvanja']),
        error: err => console.error('Greška pri izmeni zvanja:', err)
      });
    } else {
      this.zvanjeService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/zvanja']),
        error: err => console.error('Greška pri čuvanju zvanja:', err)
      });
    }
  }

  private kreirajModel(podaci?: any): FormaModel {
    let selektovanTipZvanja = podaci?.tipZvanja ?? null;
    let selektovanaNaucnaOblast = podaci?.naucnaOblast ?? null;
    let selektovaniNastavnik = podaci?.nastavnik ?? null;
    
    return {
      naziv: podaci ? 'Izmena zvanja' : 'Dodavanje zvanja',
      polja: [
        {
          naziv: 'datumIzbora',
          labela: 'Datum Izbora',
          tip: 'date',
          podrazumevanaVrednost: podaci?.datumIzbora ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'datumPrestanka',
          labela: 'Datum Prestanka',
          tip: 'date',
          podrazumevanaVrednost: podaci?.datumPrestanka ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'tipZvanja',
          labela: 'Tip Zvanja',
          tip: 'select',
          podrazumevanaVrednost: selektovanTipZvanja,
          opcije: this.sviTipoviZvanja,
          validatori: [Validators.required]
        },
        {
          naziv: 'naucnaOblast',
          labela: 'Naucna Oblast',
          tip: 'select',
          podrazumevanaVrednost: selektovanaNaucnaOblast,
          opcije: this.sveNaucneOblasti,
          validatori: [Validators.required]
        },
        {
          naziv: 'nastavnik',
          labela: 'Nastavnik',
          tip: 'select',
          podrazumevanaVrednost: selektovaniNastavnik,
          opcije: this.sviNastavnici,
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
