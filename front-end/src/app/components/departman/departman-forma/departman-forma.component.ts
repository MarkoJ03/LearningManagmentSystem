import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { Nastavnik } from '../../../models/Nastavnik';
import { Fakultet } from '../../../models/Fakultet';
import { Katedra } from '../../../models/Katedra';
import { Departman } from '../../../models/Departaman';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmanService } from '../../../services/departman.service';
import { NastavnikService } from '../../../services/nastavnik.service';
import { FakultetService } from '../../../services/fakultet.service';
import { DepartmanNastavnikService } from '../../../services/departman-nastavnik.service';
import { KatedraService } from '../../../services/katedra.service';

@Component({
  selector: 'app-departman-forma',
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './departman-forma.component.html',
  styleUrls: ['./departman-forma.component.css']
})
export class DepartmanFormaComponent {

  formaModel: FormaModel | null = null;


  sviSekretariDepartmana: Nastavnik[] = [];
  sviDirektoriDepartmana: Nastavnik[] = [];
  sviFakulteti: Fakultet[] = [];
  idDepartman: number | null = null;
  selektovaneKatedre: Katedra[] = [];
  sveKatedre: Katedra[] = [];
  selektovaniNastavnik: Nastavnik[] = [];
  sviNastavnici: Nastavnik[] = [];
  kreiraniDepartman: Departman | null = null;

  constructor(
    private departmanService: DepartmanService,
    private sekretarDepartmanaService: NastavnikService,
    private direktorDepartmanaService: NastavnikService,
    private fakultetService: FakultetService,
    private nastavnikService: NastavnikService,
    private router: Router,
    private route: ActivatedRoute,
    private departmanNastavnikService: DepartmanNastavnikService,
    private katedraService: KatedraService
  ) { }

  ngOnInit(): void {
    this.katedraService.getAll().subscribe(katedre => {
      this.sveKatedre = katedre;
    });

    this.nastavnikService.getAll().subscribe(nastavnici => {
      this.sviSekretariDepartmana = nastavnici;
      this.sviDirektoriDepartmana = nastavnici;
      this.sviNastavnici = nastavnici;

      this.fakultetService.getAll().subscribe(fakulteti => {
        this.sviFakulteti = fakulteti;

        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
          this.idDepartman = +idParam;
          this.departmanService.getById(this.idDepartman).subscribe(departman => {
            this.formaModel = this.kreirajModel(departman);

            const katedreZaDepartman = this.sveKatedre.filter(k => k.departman?.id === departman.id);
            console.log('Katedre za ovaj departman:', katedreZaDepartman);
          });
        } else {
          this.formaModel = this.kreirajModel();
        }
      });
    });
  }

  otkazi(): void {
    this.router.navigate(['/departmani']);
  }

  public sacuvajDepartman(vrednosti: any): void {
    console.log("izmenjeno", vrednosti);
    vrednosti.katedre = [];

    if (this.idDepartman) {

      this.departmanService.update(this.idDepartman, vrednosti).subscribe({
        next: () => {
          this.router.navigate(['/departmani']);
          this.kreiraniDepartman = vrednosti;

          for (let nastavnik of vrednosti.nastavnici) {
            const veza = {
              departman: vrednosti,
              nastavnik: nastavnik,
              vidljiv: true
            };

            console.log(veza)
            this.departmanNastavnikService.create(veza).subscribe({
              next: () => console.log(`Povezan nastavnik ${nastavnik.id} sa departmanom ${vrednosti.id}`),
              error: err => console.error('Greška pri vezivanju nastavnika:', err)
            });

          }

          this.departmanNastavnikService.getByDepartmanId(this.idDepartman!).subscribe(povezani => {
            let selektovaniNastavniciId = vrednosti.nastavnici.map((n: any) => n.id);

            let izbaciti = povezani.filter(p => !selektovaniNastavniciId.includes(p.nastavnik.id));

            for (let nastavnikVeza of izbaciti) {
              console.log("Izbaci nastavnika:", nastavnikVeza.nastavnik);

              this.departmanNastavnikService.delete(nastavnikVeza.id!).subscribe({
                next: () => console.log(`Veza obrisana: ${nastavnikVeza.id}`),
                error: err => console.error('Greška pri brisanju veze:', err)
              });
            }
          });


        },
        error: err => console.error('Greška pri izmeni departmana:', err)
      }
      );
    } else {
      this.departmanService.create(vrednosti).subscribe({
        next: (departman) => {
          console.log('Kreiran departman:', departman);
          this.kreiraniDepartman = departman;

          for (let nastavnik of vrednosti.nastavnici) {
            const veza = {
              departman: departman,
              nastavnik: nastavnik,
              vidljiv: true
            };

            this.departmanNastavnikService.create(veza).subscribe({
              next: () => console.log(`Povezan nastavnik ${nastavnik.id} sa departmanom ${departman.id}`),
              error: err => console.error('Greška pri vezivanju nastavnika:', err)
            });
          }

          this.router.navigate(['/departmani']);
        },
        error: err => console.error('Greška pri čuvanju departmana:', err)
      });
    }

    console.log(vrednosti);
  }

  private kreirajModel(podaci?: any): FormaModel {
    const selektovaniFakultet = podaci?.fakultet ?? null;
    const selektovaniSekretar = podaci?.sekretarDepartmana ?? null;
    const selektovaniDirektor = podaci?.direktorDepartmana ?? null;
    const selektovaneKatedre = podaci?.katedre ?? [];

    return {
      naziv: podaci ? 'Izmena departmana' : 'Dodavanje departmana',
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
          naziv: 'fakultet',
          labela: 'Fakultet',
          tip: 'select',
          podrazumevanaVrednost: selektovaniFakultet,
          opcije: this.sviFakulteti,
          displayFn: (f: Fakultet) => `${f.naziv}`,
          validatori: [Validators.required]
        },
        {
          naziv: 'sekretarDepartmana',
          labela: 'Sekretar',
          tip: 'select',
          podrazumevanaVrednost: selektovaniSekretar,
          opcije: this.sviSekretariDepartmana,
          displayFn: (n: Nastavnik) => `${n.ime} ${n.prezime}`,
          validatori: [Validators.required]
        },
        {
          naziv: 'direktorDepartmana',
          labela: 'Direktor',
          tip: 'select',
          podrazumevanaVrednost: selektovaniDirektor,
          opcije: this.sviDirektoriDepartmana,
          displayFn: (n: Nastavnik) => `${n.ime} ${n.prezime}`,
          validatori: [Validators.required]
        },
        {
          naziv: 'katedre',
          labela: 'Katedre',
          tip: 'checkbox-list',
          podrazumevanaVrednost: selektovaneKatedre,
          opcije: this.sveKatedre,
          displayFn: (k: Katedra) => k.naziv,
        },
        {
          naziv: 'nastavnici',
          labela: 'Nastavnici',
          tip: 'checkbox-list',
          podrazumevanaVrednost: [],
          opcije: this.sviNastavnici,
          displayFn: (n: Nastavnik) => `${n.ime} ${n.prezime}`
        },
      ]
    };
  }
}
