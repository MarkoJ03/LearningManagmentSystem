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
import { KatedraNastavnik } from '../../../../models/KatedraNastavnik';

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
  sviNastavnici: Nastavnik[] = [];

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
      const izmenjenaKatedra = {
        ...vrednosti,
        nastavnici: vrednosti.nastavnici.map((n: Nastavnik) => ({
          nastavnik: { id: n.id },
          vidljiv: true
        })),
        studijskiProgrami: vrednosti.studijskiProgrami.map((sp: StudijskiProgram) => ({
          id: sp.id
        }))
      };

      this.katedraService.update(this.idKatedre, izmenjenaKatedra).subscribe({
        next: () => this.router.navigate(['/katedre']),
        error: err => console.error('Greška pri izmeni katedre:', err)
      });
    } else {
      const novaKatedra = {
        ...vrednosti,
        nastavnici: vrednosti.nastavnici.map((n: Nastavnik) => ({
          nastavnik: { id: n.id },
          vidljiv: true
        })),
        studijskiProgrami: vrednosti.studijskiProgrami.map((sp: StudijskiProgram) => ({
          id: sp.id
        }))
      };

      this.katedraService.create(novaKatedra).subscribe({
        next: () => this.router.navigate(['/katedre']),
        error: err => console.error('Greška pri čuvanju katedre:', err)
      });
    }
  }

  private kreirajModel(podaci?: Katedra): FormaModel {
    let selektovaniSefKatedre = podaci?.sefKatedre ?? null;
    let selektovaniSekretarKatedre = podaci?.sekretarKatedre ?? null;
    let selektovaniNastavnici: Nastavnik[] = podaci?.nastavnici?.map(nk => nk.nastavnik) ?? [];
    let selektovaniStudijskiProgrami = podaci?.studijskiProgrami ?? [];
    let selektovaniDepartman = podaci?.departman ?? null;


    return {
      naziv: podaci ? 'Izmena katedre' : 'Dodavanje katedre',
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
          displayFn: (n: Nastavnik) => `${n.ime} ${n.prezime}`,
          validatori: [Validators.required]
        },
        {
          naziv: 'sekretarKatedre',
          labela: 'Sekretar Katedre',
          tip: 'select',
          podrazumevanaVrednost: selektovaniSekretarKatedre,
          opcije: this.sviNastavnici,
          displayFn: (n: Nastavnik) => `${n.ime} ${n.prezime}`,
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
          displayFn: (n: Nastavnik) => `${n.ime} ${n.prezime}`,
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
