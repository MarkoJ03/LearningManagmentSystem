import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerickaFormaComponent } from '../../../genericka-forma/genericka-forma.component';
import { FormaModel } from '../../../genericka-forma/FormaModel';
import { KorisnikService } from '../../../../services/korisnik.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-korisnik-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './korisnik-forma.component.html',
  styleUrl: './korisnik-forma.component.css'
})
export class KorisnikFormaComponent {
  formaModel: FormaModel | null = null;
  idKorisnika: number | null = null;

  constructor(
    private korisnikService: KorisnikService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idKorisnika = +idParam;
      this.korisnikService.getById(this.idKorisnika).subscribe(korisnik => {
        this.formaModel = this.kreirajModel(korisnik);
      });
    } else {
      this.formaModel = this.kreirajModel();
    }
  }

  otkazi(): void {
    this.router.navigate(['/korisnici']);
  }

  public sacuvajKorisnika(vrednosti: any): void {
    if (this.idKorisnika) {
      this.korisnikService.update(this.idKorisnika, vrednosti).subscribe({
        next: () => this.router.navigate(['/korisnici']),
        error: err => console.error('Greška pri izmeni korisnika:', err)
      });
    } else {
      this.korisnikService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/korisnici']),
        error: err => console.error('Greška pri čuvanju korisnika:', err)
      });
    }
  }

  private kreirajModel(podaci?: any): FormaModel {
    return {
      naziv: podaci ? 'Izmena korisnika' : 'Dodavanje korisnika',
      polja: [
        {
          naziv: 'email',
          labela: 'Email',
          tip: 'text',
          podrazumevanaVrednost: podaci?.email ?? '',
          validatori: [Validators.required]
        },
        {
          naziv: 'lozinka',
          labela: 'Lozinka',
          tip: 'text',
          podrazumevanaVrednost: '',
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
