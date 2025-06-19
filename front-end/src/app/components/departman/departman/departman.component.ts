import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Departman } from '../../../models/Departaman';
import { DepartmanService } from '../../../services/departman.service';
import { KatedraService } from '../../../services/katedra.service';
import { Katedra } from '../../../models/Katedra';
import { Nastavnik } from '../../../models/Nastavnik'; // Uvezeno
import { DepartmanNastavnikService } from '../../../services/departman-nastavnik.service'; // Uvezeno
import { DepartmanNastavnik } from '../../../models/DepartmanNastavnik'; // Uvezeno
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-departman',
  imports: [CommonModule, RouterLink],
  templateUrl: './departman.component.html',
  styleUrl: './departman.component.css'
})
export class DepartmanComponent {

  departman: Departman | null = null;
  katedreZaDepartman: Katedra[] = []; // OVO JE KLJUČNO: Deklaracija svojstva

  constructor(
    private route: ActivatedRoute,
    private departmanService: DepartmanService,
    private katedraService: KatedraService,
    private departmanNastavnikService: DepartmanNastavnikService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const id = +params['id'];
        if (isNaN(id)) {
          console.error('Nevažeći ID departmana.');
          return of([null, [], []] as [Departman | null, Katedra[], DepartmanNastavnik[]]);
        }
        return forkJoin([
          this.departmanService.getById(id),
          this.katedraService.getAll(), // Učitaj sve katedre
          this.departmanNastavnikService.getByDepartmanId(id) // Učitaj veze departman-nastavnik
        ]);
      })
    ).subscribe(
      ([departmanData, allKatedre, departmanNastavnikRelations]) => {
        if (!departmanData) {
          console.warn('Departman nije pronađen.');
          this.departman = null;
          this.katedreZaDepartman = []; // Osiguraj da je prazan niz ako nema departmana
          return;
        }

        // Popuni katedreZaDepartman filtriranjem svih katedri na osnovu ID-a departmana
        this.katedreZaDepartman = allKatedre.filter((k: Katedra) => k.departman?.id === departmanData.id);

        const relevantNastavnici: Nastavnik[] = departmanNastavnikRelations
            .map((dn: DepartmanNastavnik) => dn.nastavnik)
            .filter((n): n is Nastavnik => n !== undefined && n !== null); // Osigurava da nema null/undefined

        this.departman = {
          ...departmanData,
          nastavnici: relevantNastavnici || [] // Osiguraj da je uvek niz
        };

        console.log('Detalji departmana:', this.departman);
        console.log('Katedre za departman (filtrirane za prikaz):', this.katedreZaDepartman);
        console.log('Nastavnici za departman (povezani za prikaz):', this.departman.nastavnici);
      },
      error => {
        console.error('Greška pri učitavanju detalja departmana ili povezanih podataka:', error);
        this.departman = null;
        this.katedreZaDepartman = []; // Resetuj u slučaju greške
      }
    );
  }
}
