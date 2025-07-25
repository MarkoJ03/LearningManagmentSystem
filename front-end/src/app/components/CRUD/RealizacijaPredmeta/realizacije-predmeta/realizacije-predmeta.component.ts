import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseTableComponent } from '../../../base-table/base-table.component';
import { RealizacijaPredmeta } from '../../../../models/RealizacijaPredmeta';
import { RealizacijaPredmetaService } from '../../../../services/realizacija-predmeta.service';

@Component({
  selector: 'app-realizacije-predmeta',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './realizacije-predmeta.component.html',
  styleUrl: './realizacije-predmeta.component.css'
})
export class RealizacijePredmetaComponent {
  realizacijePredmeta: RealizacijaPredmeta[] = [];
  kolone: string[] = ['nastavnikImePrezime', 'tipNastaveNaziv', 'predmet', 'terminiNastaveVreme', 'vidljiv'];

  constructor(
    private realizacijaPredmetaService: RealizacijaPredmetaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.realizacijaPredmetaService.getAll().subscribe({
      next: (res) => {
        this.realizacijePredmeta = res.map(r => ({
          ...r,
          nastavnikImePrezime: `${r.nastavnik.ime} ${r.nastavnik.prezime}`,
          tipNastaveNaziv: r.tipNastave,
          predmet: r.predmeti?.map(p => p.predmet.id).join(', '),
          terminiNastaveVreme: r.terminiNastave?.map(t => `${t.vremePocetka} - ${t.vremeKraja}`).join(', '),
        }));
      },
      error: (err) => console.error('Greška prilikom učitavanja realizacija predmeta:', err),
    });
  }

  izmeni(realizacijaPredmeta: RealizacijaPredmeta): void {
    this.router.navigate(['/realizacije-predmeta/forma', realizacijaPredmeta.id]);
  }

  obrisi(id: number): void {
    this.realizacijaPredmetaService.delete(id).subscribe(() => {
      this.realizacijePredmeta = this.realizacijePredmeta.filter(a => a.id !== id);
    });
  }


  detalji(id: number): void {
    this.router.navigate(['/realizacije-predmeta', id]);
  }

  otkazi(): void {
    this.router.navigate(['/realizacije-predmeta']);
  }
}
