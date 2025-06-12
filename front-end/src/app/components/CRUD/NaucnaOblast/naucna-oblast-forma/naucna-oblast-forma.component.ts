import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerickaFormaComponent } from '../../../genericka-forma/genericka-forma.component';
import { FormaModel } from '../../../genericka-forma/FormaModel';
import { Zvanje } from '../../../../models/Zvanje';
import { NaucnaOblastService } from '../../../../services/naucna-oblast.service';
import { ZvanjeService } from '../../../../services/zvanje.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NaucnaOblast } from '../../../../models/NaucnaOblast';

@Component({
  selector: 'app-naucna-oblast-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './naucna-oblast-forma.component.html',
  styleUrl: './naucna-oblast-forma.component.css'
})
export class NaucnaOblastFormaComponent {
  formaModel: FormaModel | null = null;
  idNaucneOblasti: number | null = null;
  svaZvanja: Zvanje[] = [];

  constructor(
    private naucnaOblastService: NaucnaOblastService,
    private zvanjeService: ZvanjeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.zvanjeService.getAll().subscribe(zvanja => {
      this.svaZvanja = zvanja;

      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        this.idNaucneOblasti = +idParam;
        this.naucnaOblastService.getById(this.idNaucneOblasti).subscribe(naucnaOblast => {
          this.formaModel = this.kreirajModel(naucnaOblast);
        });
      } else {
        this.formaModel = this.kreirajModel();
      }

    })
  }

  otkazi(): void {
    this.router.navigate(['/naucne-oblasti']);
  }

  // public sacuvajNaucnuOblast(vrednosti: any): void {
  //   if (this.idNaucneOblasti) {
  //     this.naucnaOblastService.update(this.idNaucneOblasti, vrednosti).subscribe({
  //       next: () => {
  //         this.router.navigate(['/naucne-oblasti'])
  //         console.log('Šaljem vrednosti:', vrednosti);
  //       },
  //       error: err => console.error('Greška pri izmeni naucne oblasti:', err)
  //     });
  //   } else {
  //     this.naucnaOblastService.create(vrednosti).subscribe({
  //       next: () => {
  //         this.router.navigate(['/naucne-oblasti'])
  //         console.log('Šaljem vrednosti:', vrednosti);
  //       },
  //       error: err => console.error('Greška pri čuvanju naucne oblasti:', err)
  //     });
  //   }
  // }

  public sacuvajNaucnuOblast(vrednosti: any): void {
  const vrednostiZaSlanje = {
    ...vrednosti,
    vidljiv: vrednosti.vidljiv === 'true' || vrednosti.vidljiv === true,
    zvanja: vrednosti.zvanja.map((zvanje: Zvanje) => ({ id: zvanje.id }))
  };

  if (this.idNaucneOblasti) {
    this.naucnaOblastService.update(this.idNaucneOblasti, vrednostiZaSlanje).subscribe({
      next: () => this.router.navigate(['/naucne-oblasti']),
      error: err => console.error('Greška pri izmeni naucne oblasti:', err)
    });
  } else {
    this.naucnaOblastService.create(vrednostiZaSlanje).subscribe({
      next: () => this.router.navigate(['/naucne-oblasti']),
      error: err => console.error('Greška pri čuvanju naucne oblasti:', err)
    });
  }
}



  private kreirajModel(podaci?: NaucnaOblast): FormaModel {
    // let selektovanaZvanja = podaci?.zvanja?.map(z => z.id) ?? [];
    let selektovanaZvanja = podaci?.zvanja
      ?.map(zvanjeIzPodataka => this.svaZvanja.find(z => z.id === zvanjeIzPodataka.id))
      .filter(z => z !== undefined) ?? [];


    return {
      naziv: podaci ? 'Izmena naucne oblasti' : 'Dodavanje naucne oblasti',
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
          naziv: 'zvanja',
          labela: 'Zvanja',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovanaZvanja,
          opcije: this.svaZvanja,
          displayFn: (z: Zvanje) => `${z.tipZvanja.naziv}`,
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
