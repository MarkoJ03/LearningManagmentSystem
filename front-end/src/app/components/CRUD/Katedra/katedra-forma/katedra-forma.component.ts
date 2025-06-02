import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerickaFormaComponent } from '../../../genericka-forma/genericka-forma.component';
import { FormaModel } from '../../../genericka-forma/FormaModel';
import { StudijskiProgram } from '../../../../models/StudijskiProgram';
import { Nastavnik } from '../../../../models/Nastavnik';
import { Katedra } from '../../../../models/Katedra';
import { KatedraService } from '../../../../services/katedra.service';
import { NastavnikService } from '../../../../services/nastavnik.service';
import { StudijskiProgramService } from '../../../../services/studijski-program.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Departman } from '../../../../models/Departaman';
import { DepartmanService } from '../../../../services/departman.service';
import { KatedraNastavnikService } from '../../../../services/katedra-nastavnik.service';

@Component({
  selector: 'app-katedra-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './katedra-forma.component.html',
  styleUrl: './katedra-forma.component.css'
})
export class KatedraFormaComponent {
  formaModel: FormaModel | null = null;
  idKatedre: number | null = null;
  kreiranaKatedra: Katedra | null = null;
  sviStudijskiProgrami: StudijskiProgram[] = [];
  sviDepartmani: Departman[] = [];
  selektovaniStudijskiProgrami: StudijskiProgram[] = [];
  sviNastavnici: Nastavnik[] = [];
  selektovaniNastavnici: Nastavnik[] = [];
  selektovaniSefKatedre: Nastavnik | null = null;
  selektovaniSekretarKatedre: Nastavnik | null = null;
  selektovaniDepartman: Departman | null = null;

  constructor(
    private katedraService: KatedraService,
    private nastavnikService: NastavnikService,
    private studijskiProgramService: StudijskiProgramService,
    private departmanService: DepartmanService,
    private katedraNastavnikService: KatedraNastavnikService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.nastavnikService.getAll().subscribe(nastavnici => {
      this.sviNastavnici = nastavnici;

      this.studijskiProgramService.getAll().subscribe(studijskiProgrami => {
        this.sviStudijskiProgrami = studijskiProgrami;

        this.departmanService.getAll().subscribe(departmani => {
          this.sviDepartmani = departmani;

          const idParam = this.route.snapshot.paramMap.get('id');
          if (idParam) {
            this.idKatedre = +idParam;
            this.katedraService.getById(this.idKatedre).subscribe(katedra => {
              this.formaModel = this.kreirajModel(katedra);
            });
          } else {
            this.formaModel = this.kreirajModel();
          }
        })
      })


    })

  }

  otkazi(): void {
    this.router.navigate(['/katedre']);
  }

  public sacuvajKatedru(vrednosti: any): void {
    if (this.idKatedre) {
      this.katedraService.update(this.idKatedre, vrednosti).subscribe({
        next: () => this.router.navigate(['/katedre']),
        error: err => console.error('Greška pri izmeni katedre:', err)
      });
    } else {
      this.katedraService.create(vrednosti).subscribe({
        next: (katedra) => {
          this.kreiranaKatedra = katedra

          for (let nastavnik of vrednosti.nastavnik) {
            const veza = {
              katedra: katedra,
              nastavnik: nastavnik,
              vidljiv: true
            };

            this.katedraNastavnikService.create(veza).subscribe({
              next: () => console.log(`Povezan nastavnik ${nastavnik.id} sa katedrom ${katedra.id}`),
              error: err => console.error('Greška pri vezivanju nastavnika:', err)
            });
          }
          
          this.router.navigate(['/katedre'])
        },
        error: err => console.error('Greška pri čuvanju katedre:', err)
      });
    }
  }

  private kreirajModel(podaci?: any): FormaModel {
    //let selektovaniFakulteti = null;
    //if (podaci?.fakultet) {
    let selektovaniSefKatedre = podaci?.nastavnik ?? null;
    let selektovaniSekretarKatedre = podaci?.nastavnik ?? null;
    let selektovaniNastavnici = podaci?.nastavnik ?? [];
    let selektovaniStudijskiProgrami = podaci?.studijskiProgram ?? [];
    let selektovaniDepartman = podaci?.departman ?? null;
    //}

    return {
      naziv: podaci ? 'Izmena katedre' : 'Dodavanje katedre',
      polja: [
        {
          naziv: 'naziv',
          labela: 'Naziv',
          tip: 'text',
          podrazumevanaVrednost: podaci?.naziv ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'departman',
          labela: 'Departman',
          tip: 'select',
          podrazumevanaVrednost: selektovaniDepartman,
          opcije: this.sviDepartmani,
          displayFn: (d: Departman) => d.naziv,
          validatori: [Validators.required]
        },
        {
          naziv: 'sefKatedre',
          labela: 'Sef Katedre',
          tip: 'select',
          podrazumevanaVrednost: selektovaniSefKatedre,
          opcije: this.sviNastavnici,
          displayFn: (n: Nastavnik) => n.ime && n.prezime,
          validatori: [Validators.required]
        },
        {
          naziv: 'sekretarKatedre',
          labela: 'Sekretar Katedre',
          tip: 'select',
          podrazumevanaVrednost: selektovaniSekretarKatedre,
          opcije: this.sviNastavnici,
          displayFn: (n: Nastavnik) => n.ime && n.prezime,
          validatori: [Validators.required]
        },
        {
          naziv: 'studijskiProgrami',
          labela: 'Studijski Program',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovaniStudijskiProgrami,
          opcije: this.sviStudijskiProgrami,
          displayFn: (s: StudijskiProgram) => s.naziv,
          validatori: [Validators.required]
        },
        {
          naziv: 'nastavnici',
          labela: 'Nastavnici',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovaniNastavnici,
          opcije: this.sviNastavnici,
          displayFn: (n: Nastavnik) => n.ime && n.prezime,
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
