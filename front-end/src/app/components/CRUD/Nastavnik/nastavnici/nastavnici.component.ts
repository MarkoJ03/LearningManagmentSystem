import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseTableComponent } from '../../../base-table/base-table.component';
import { Nastavnik } from '../../../../models/Nastavnik';
import { NastavnikService } from '../../../../services/nastavnik.service';

@Component({
  selector: 'app-nastavnici',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './nastavnici.component.html',
  styleUrl: './nastavnici.component.css'
})
export class NastavniciComponent {
  nastavnici: Nastavnik[] = [];
  kolone: string[] = ['korisnik', 'ime', 'prezime', 'jmbg', 
    'zvanjaNazivi', 'departmaniNazivi', 'katedreNazivi', 'realizacijePredmeta', 
    'obavestenjaNaslovi', 'evaluacijeZnanja', 'vidljiv'];

  constructor(
    private nastavnikService: NastavnikService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nastavnikService.getAll().subscribe({
  next: (res) => {
    this.nastavnici = res.map(n => ({
      ...n,
      zvanjaNazivi: n.zvanja?.map(z => z.tipZvanja.naziv).join(', '),
      departmaniNazivi: n.departmani?.map(d => d.departman.naziv).join(', '),
      katedreNazivi: n.katedre?.map(k => k.katedra.naziv).join(', '),
      obavestenjaNaslovi: n.obavestenja?.map(o => o.naslov).join(', ')
    }));
  },
  error: (err) => console.error('Greška prilikom učitavanja nastavnika:', err),
});

  }

  izmeni(nastavnik: Nastavnik): void {
    this.router.navigate(['/nastavnici/forma', nastavnik.id]);
  }

  obrisi(id: number): void {
    this.nastavnikService.delete(id).subscribe(() => {
      this.nastavnici = this.nastavnici.filter(a => a.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/nastavnici', id]);
  }

  otkazi(): void {
    this.router.navigate(['/nastavnici']);
  }
}
