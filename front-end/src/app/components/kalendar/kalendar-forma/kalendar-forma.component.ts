import { Component, OnInit } from '@angular/core';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { Kalendar } from '../../../models/Kalendar';
import { KalendarService } from '../../../services/kalendar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-kalendar-forma',
  standalone: true,
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './kalendar-forma.component.html',
  styleUrls: ['./kalendar-forma.component.css']
})
export class KalendarFormaComponent implements OnInit {
  formaModel: FormaModel | null = null;
  idKalendar: number | null = null;

  constructor(
    private kalendarService: KalendarService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idKalendar = +idParam;
      this.kalendarService.getById(this.idKalendar).subscribe(data => {
        this.formaModel = this.kreirajModel(data);
      });
    } else {
      this.formaModel = this.kreirajModel();
    }
  }

  otkazi(): void {
    this.router.navigate(['/kalendar']);
  }

  sacuvaj(vrednosti: any): void {
    if (this.idKalendar) {
      this.kalendarService.update(this.idKalendar, vrednosti).subscribe({
        next: () => this.router.navigate(['/kalendar']),
        error: err => console.error('Greška:', err)
      });
    } else {
      this.kalendarService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/kalendar']),
        error: err => console.error('Greška:', err)
      });
    }
  }

  private kreirajModel(podaci?: Kalendar): FormaModel {
    return {
      naziv: podaci ? 'Izmena kalendara' : 'Dodavanje kalendara',
      polja: [
        ...(podaci ? [{ naziv: 'id', labela: '', tip: 'hidden', podrazumevanaVrednost: podaci.id }] : []),
        {
          naziv: 'vidljiv',
          labela: 'Vidljiv',
          tip: 'checkbox',
          podrazumevanaVrednost: podaci?.vidljiv ?? true
        }
      ]
    };
  }
}
