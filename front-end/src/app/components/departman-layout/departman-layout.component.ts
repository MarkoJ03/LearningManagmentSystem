import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DepartmanService } from '../../services/departman.service';
import { Departman } from '../../models/Departaman';
import { CommonModule } from '@angular/common';
import { UniverzitetFooterComponent } from '../../../components/shared/univerzitet-footer/univerzitet-footer.component';
import { UniverzitetHeaderComponent } from '../../../components/shared/univerzitet-header/univerzitet-header.component';
import { NastavnikService } from '../../services/nastavnik.service';
import { Zvanje } from '../../models/Zvanje';


@Component({
  selector: 'app-departman-layout',
  imports: [CommonModule, UniverzitetHeaderComponent, UniverzitetFooterComponent,RouterLink],
  templateUrl: './departman-layout.component.html',
  styleUrls: ['./departman-layout.component.css']
})
export class DepartmanLayoutComponent implements OnInit {
  departman: Departman | null = null;
  sefoviKatedriZvanja: { [id: number]: Zvanje[] } = {};
  sekretariKatedriZvanja: { [id: number]: Zvanje[] } = {};

  constructor(
    private route: ActivatedRoute,
    private departmanService: DepartmanService,
    private nastavnikService: NastavnikService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.departmanService.getById(id).subscribe({
      next: (data) => {
        this.departman = data;

        for (const katedra of data.katedre ?? []) {
          const sefId = katedra.sefKatedre?.id;
          if (sefId && !this.sefoviKatedriZvanja[sefId]) {
            this.nastavnikService.getById(sefId).subscribe({
              next: (nastavnik) => {
                this.sefoviKatedriZvanja[sefId] = nastavnik.zvanja ?? [];
              },
              error: (err) => console.error(`Greška za šefa ${sefId}`, err)
            });
          }

          const sekId = katedra.sekretarKatedre?.id;
          if (sekId && !this.sekretariKatedriZvanja[sekId]) {
            this.nastavnikService.getById(sekId).subscribe({
              next: (nastavnik) => {
                this.sekretariKatedriZvanja[sekId] = nastavnik.zvanja ?? [];
              },
              error: (err) => console.error(`Greška za sekretara ${sekId}`, err)
            });
          }
        }
      },
      error: (err) => console.error('Greška pri dohvatanju departmana:', err)
    });
  }
}