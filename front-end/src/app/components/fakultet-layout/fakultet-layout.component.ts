import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { UniverzitetHeaderComponent } from '../../../components/shared/univerzitet-header/univerzitet-header.component';
import { UniverzitetFooterComponent } from '../../../components/shared/univerzitet-footer/univerzitet-footer.component';

import { FakultetService } from '../../services/fakultet.service';
import { NastavnikService } from '../../services/nastavnik.service';

import { Fakultet } from '../../models/Fakultet';
import { Zvanje } from '../../models/Zvanje';

@Component({
  selector: 'app-fakultet-layout',
  standalone: true,
  imports: [CommonModule, UniverzitetHeaderComponent, UniverzitetFooterComponent,RouterLink],
  templateUrl: './fakultet-layout.component.html',
  styleUrls: ['./fakultet-layout.component.css']
})
export class FakultetLayoutComponent implements OnInit {
  fakultet: Fakultet | null = null;
  sekretariZvanja: { [id: number]: Zvanje[] } = {};
  direktoriZvanja: { [id: number]: Zvanje[] } = {};

  constructor(
    private route: ActivatedRoute,
    private fakultetService: FakultetService,
    private nastavnikService: NastavnikService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? parseInt(idParam, 10) : null;

    if (id !== null && !isNaN(id)) {
      this.fakultetService.getById(id).subscribe({
        next: (data: Fakultet) => {
          this.fakultet = data;

          for (const dep of data.departmani ?? []) {
            const sekId = dep.sekretarDepartmana?.id;
            if (sekId && !this.sekretariZvanja[sekId]) {
              this.nastavnikService.getById(sekId).subscribe({
                next: (nastavnik) => {
                  this.sekretariZvanja[sekId] = nastavnik.zvanja ?? [];
                },
                error: (err) => {
                  console.error(`Greška pri dohvatanju zvanja za sekretara ${sekId}`, err);
                }
              });
            }

            const dirId = dep.direktorDepartmana?.id;
            if (dirId && !this.direktoriZvanja[dirId]) {
              this.nastavnikService.getById(dirId).subscribe({
                next: (nastavnik) => {
                  this.direktoriZvanja[dirId] = nastavnik.zvanja ?? [];
                },
                error: (err) => {
                  console.error(`Greška pri dohvatanju zvanja za direktora ${dirId}`, err);
                }
              });
            }
          }
        },
        error: (err) => {
          console.error('Greška pri dohvatanju fakulteta:', err);
        }
      });
    }
  }
}
