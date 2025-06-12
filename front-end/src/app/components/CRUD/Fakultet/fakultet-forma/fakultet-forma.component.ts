import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerickaFormaComponent } from '../../../genericka-forma/genericka-forma.component';
import { FormaModel } from '../../../genericka-forma/FormaModel';
import { Departman } from '../../../../models/Departaman';
import { Univerzitet } from '../../../../models/Univerzitet';
import { FakultetService } from '../../../../services/fakultet.service';
import { DepartmanService } from '../../../../services/departman.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UniverzitetService } from '../../../../services/univerzitet.service';
import { Fakultet } from '../../../../models/Fakultet';

@Component({
  selector: 'app-fakultet-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './fakultet-forma.component.html',
  styleUrl: './fakultet-forma.component.css'
})
export class FakultetFormaComponent {
  formaModel: FormaModel | null = null;
  idFakulteta: number | null = null;
  sviDepartmani: Departman[] = [];
  sviUniverziteti: Univerzitet[] = [];

  constructor(
    private fakultetService: FakultetService,
    private departmanService: DepartmanService,
    private univerzitetService: UniverzitetService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.departmanService.getAll().subscribe(departmani => {
      this.sviDepartmani = departmani;

      this.univerzitetService.getAll().subscribe(univerziteti => {
        this.sviUniverziteti = univerziteti;

        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
          this.idFakulteta = +idParam;
          this.fakultetService.getById(this.idFakulteta).subscribe(fakultet => {
            this.formaModel = this.kreirajModel(fakultet);

            const departmaniZaFakultet = this.sviDepartmani.filter(d => d.fakultet?.id === fakultet.id);
            console.log('Katedre za ovaj departman:', departmaniZaFakultet);
          });
        } else {
          this.formaModel = this.kreirajModel();
        }
      })
    })
  }

  otkazi(): void {
    this.router.navigate(['/fakulteti']);
  }

public sacuvajFakultet(vrednosti: any): void {
    if (this.idFakulteta) {
      this.fakultetService.update(this.idFakulteta, vrednosti).subscribe({
        next: () => this.router.navigate(['/fakulteti']),
        error: err => console.error('Greška pri izmeni fakulteta:', err)
      });
    } else {
      this.fakultetService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/fakulteti']),
        error: err => console.error('Greška pri čuvanju fakulteta:', err)
      });
    }
  }


  private kreirajModel(podaci?: Fakultet): FormaModel {
    let selektovaniDepartmani = podaci?.departmani ?? [];
    let selektovaniUniverzitet = podaci?.univerzitet ?? null;

    return {
      naziv: podaci ? 'Izmena fakulteta' : 'Dodavanje fakulteta',
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
          naziv: 'univerzitet',
          labela: 'Univerzitet',
          tip: 'select',
          podrazumevanaVrednost: selektovaniUniverzitet,
          opcije: this.sviUniverziteti,
          displayFn: (u: Univerzitet) => u.naziv,
          validatori: [Validators.required]
        },
        {
          naziv: 'departmani',
          labela: 'Departmani',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovaniDepartmani,
          opcije: this.sviDepartmani,
          displayFn: (d: Departman) => d.naziv,
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
