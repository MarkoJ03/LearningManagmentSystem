import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerickaFormaComponent } from '../../../genericka-forma/genericka-forma.component';
import { FormaModel } from '../../../genericka-forma/FormaModel';
import { KorisnikService } from '../../../../services/korisnik.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Korisnik } from '../../../../models/Korisnik';
import { DodeljenoPravoPristupaService } from '../../../../services/dodeljeno-pravo-pristupa.service';
import { PravoPristupaService } from '../../../../services/pravo-pristupa.service';
import { PravoPristupa } from '../../../../models/PravoPristupa';
import { forkJoin, Observable, of } from 'rxjs';

@Component({
  selector: 'app-korisnik-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './korisnik-forma.component.html',
  styleUrl: './korisnik-forma.component.css'
})
export class KorisnikFormaComponent {
  formaModel: FormaModel | null = null;
  idKorisnika: number | null = null;
  kreiranKorisnik: Korisnik | null = null;
  svaPravaPristupa: PravoPristupa[] = [];

  constructor(
    private korisnikService: KorisnikService,
    private dodeljenoPravoService: DodeljenoPravoPristupaService,
    private pravoPristupaService: PravoPristupaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pravoPristupaService.getAll().subscribe(prava => {
      this.svaPravaPristupa = prava;

      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        this.idKorisnika = +idParam;
        this.korisnikService.getById(this.idKorisnika).subscribe(korisnik => {
          this.formaModel = this.kreirajModel(korisnik);
        });
      } else {
        this.formaModel = this.kreirajModel();
      }
    })
  }

  otkazi(): void {
    this.router.navigate(['/korisnici']);
  }

  public sacuvajKorisnika(vrednosti: any): void {
      if (this.idKorisnika) {
        const izmenjeniKorisnik = {
          ...vrednosti,
          dodeljenaPravaPristupa: vrednosti.dodeljenaPravaPristupa.map((p: PravoPristupa) => ({
            pravoPristupa: { id: p.id },
            vidljiv: true
          })),
        };
  
        this.korisnikService.update(this.idKorisnika, izmenjeniKorisnik).subscribe({
          next: () => this.router.navigate(['/korisnici']),
          error: err => console.error('Greška pri izmeni korisnika:', err)
        });
      } else {
        const noviKorisnik = {
          ...vrednosti,
          dodeljenaPravaPristupa: vrednosti.dodeljenaPravaPristupa.map((p: PravoPristupa) => ({
            pravoPristupa: { id: p.id },
            vidljiv: true
          })),
        };
  
        this.korisnikService.create(noviKorisnik).subscribe({
          next: () => this.router.navigate(['/korisnici']),
          error: err => console.error('Greška pri čuvanju korisnika:', err)
        });
      }
    }

  private kreirajModel(podaci?: Korisnik): FormaModel {
    let selektovanaDodeljenaPrava: PravoPristupa[] = podaci?.dodeljenaPravaPristupa?.map(p => p.pravoPristupa) ?? [];

    return {
      naziv: podaci ? 'Izmena korisnika' : 'Dodavanje korisnika',
      polja: [
        ...(podaci ? [{
          naziv: 'id',
          labela: '',
          tip: 'hidden',
          podrazumevanaVrednost: podaci.id
        }] : []),
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
          naziv: 'dodeljenaPravaPristupa',
          labela: 'Prava pristupa',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovanaDodeljenaPrava,
          opcije: this.svaPravaPristupa,
          displayFn: (p: PravoPristupa) => p.naziv,
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
