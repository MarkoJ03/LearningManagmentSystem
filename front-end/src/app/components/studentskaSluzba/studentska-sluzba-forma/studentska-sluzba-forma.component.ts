import { Component, OnInit } from '@angular/core';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { StudentskaSluzba } from '../../../models/StudentskaSluzba';
import { StudentskaSluzbaService } from '../../../services/studentska-sluzba.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-studentska-sluzba-forma',
  standalone: true,
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './studentska-sluzba-forma.component.html',
  styleUrls: ['./studentska-sluzba-forma.component.css']
})
export class StudentskaSluzbaFormaComponent implements OnInit {
  formaModel: FormaModel | null = null;
  idSluzba: number | null = null;

  constructor(
    private sluzbaService: StudentskaSluzbaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idSluzba = +idParam;
      this.sluzbaService.getById(this.idSluzba).subscribe(data => {
        this.formaModel = this.kreirajModel(data);
      });
    } else {
      this.formaModel = this.kreirajModel();
    }
  }

  otkazi(): void {
    this.router.navigate(['/studentske-sluzbe']);
  }

  sacuvaj(vrednosti: any): void {
    if (this.idSluzba) {
      this.sluzbaService.update(this.idSluzba, vrednosti).subscribe({
        next: () => this.router.navigate(['/studentska-sluzba']),
        error: err => console.error('Greška:', err)
      });
    } else {
      this.sluzbaService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/studentska-sluzba']),
        error: err => console.error('Greška:', err)
      });
    }
  }

  private kreirajModel(podaci?: StudentskaSluzba): FormaModel {
  return {
    naziv: podaci ? 'Izmena studentske službe' : 'Dodavanje studentske službe',
    polja: [
      ...(podaci ? [{ naziv: 'id', labela: '', tip: 'hidden', podrazumevanaVrednost: podaci.id }] : []),
      { naziv: 'naziv', labela: 'Naziv', tip: 'text', podrazumevanaVrednost: podaci?.naziv ?? '', validatori: [Validators.required] },
      { naziv: 'vidljiv', labela: 'Vidljiv', tip: 'checkbox', podrazumevanaVrednost: podaci?.vidljiv ?? true },
      { naziv: 'objave', labela: 'Objave', tip: 'text', podrazumevanaVrednost: podaci?.objave?.length ?? 0 },
      { naziv: 'inventari', labela: 'Inventari', tip: 'text', podrazumevanaVrednost: podaci?.inventari?.length ?? 0 },
      { naziv: 'biblioteka', labela: 'Biblioteka', tip: 'text', podrazumevanaVrednost: podaci?.biblioteka ? '1' : '0' },
      { naziv: 'osoblje', labela: 'Osoblje', tip: 'text', podrazumevanaVrednost: podaci?.osoblje?.length ?? 0 },
      // { naziv: 'nastavnici', labela: 'Nastavnici', tip: 'text', podrazumevanaVrednost: podaci?.nastavnici?.length ?? 0 },
      { naziv: 'kalendari', labela: 'Kalendari', tip: 'text', podrazumevanaVrednost: podaci?.kalendari?.length ?? 0 },
      { naziv: 'studenti', labela: 'Studenti', tip: 'text', podrazumevanaVrednost: podaci?.studenti?.length ?? 0 },
      { naziv: 'obrasci', labela: 'Obrasci', tip: 'text', podrazumevanaVrednost: podaci?.obrasci?.length ?? 0 }
    ]
  };
}

}
