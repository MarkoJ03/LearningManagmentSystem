import { Component, OnInit } from '@angular/core';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { SvObrazac } from '../../../models/SvObrazac';
import { SvObrazacService } from '../../../services/sv-obrazac.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sv-obrazac-forma',
  standalone: true,
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './sv-obrazac-forma.component.html',
  styleUrls: ['./sv-obrazac-forma.component.css']
})
export class SvObrazacFormaComponent implements OnInit {
  formaModel: FormaModel | null = null;
  id: number | null = null;

  constructor(private service: SvObrazacService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.service.getById(this.id).subscribe(data => {
        this.formaModel = this.kreirajModel(data);
      });
    } else {
      this.formaModel = this.kreirajModel();
    }
  }

  otkazi(): void {
    this.router.navigate(['/sv-obrasci']);
  }

  sacuvaj(vrednosti: any): void {
    if (this.id) {
      this.service.update(this.id, vrednosti).subscribe({
        next: () => this.router.navigate(['/sv-obrasci']),
        error: err => console.error('Greška:', err)
      });
    } else {
      this.service.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/sv-obrasci']),
        error: err => console.error('Greška:', err)
      });
    }
  }

  private kreirajModel(podaci?: SvObrazac): FormaModel {
    return {
      naziv: podaci ? 'Izmena SV obrasca' : 'Dodavanje SV obrasca',
      polja: [
        ...(podaci ? [{ naziv: 'id', labela: '', tip: 'hidden', podrazumevanaVrednost: podaci.id }] : []),
        { naziv: 'maternjiJezik', labela: 'Maternji jezik', tip: 'text', podrazumevanaVrednost: podaci?.maternjiJezik ?? '', validatori: [Validators.required] },
        { naziv: 'vrstaZavreseneSrednje', labela: 'Vrsta srednje', tip: 'text', podrazumevanaVrednost: podaci?.vrstaZavreseneSrednje ?? '' },
        { naziv: 'datumZavrsetkaSrednje', labela: 'Datum završetka', tip: 'date', podrazumevanaVrednost: podaci?.datumZavrsetkaSrednje ?? '' },
        { naziv: 'bracniStatus', labela: 'Bračni status', tip: 'checkbox', podrazumevanaVrednost: podaci?.bracniStatus ?? false },
        { naziv: 'kontakt', labela: 'Kontakt', tip: 'text', podrazumevanaVrednost: podaci?.kontakt ?? '' },
        { naziv: 'zaposlen', labela: 'Zaposlen', tip: 'checkbox', podrazumevanaVrednost: podaci?.zaposlen ?? false },
        { naziv: 'nacinFinansiranja', labela: 'Način finansiranja', tip: 'checkbox', podrazumevanaVrednost: podaci?.nacinFinansiranja ?? false },
        { naziv: 'vidljiv', labela: 'Vidljiv', tip: 'checkbox', podrazumevanaVrednost: podaci?.vidljiv ?? true }
      ]
    };
  }
}
