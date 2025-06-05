import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Nastavnik } from '../../../models/Nastavnik';
import { NastavnikService } from '../../../services/nastavnik.service';

@Component({
  selector: 'app-enastavnik-sidebar',
  imports: [RouterLink],
  templateUrl: './enastavnik-sidebar.component.html',
  styleUrl: './enastavnik-sidebar.component.css'
})
export class EnastavnikSidebarComponent {
  nastavnik!: Nastavnik;
  nastavnikId!: number;

  constructor(
    private route: ActivatedRoute,
    private nastavnikService: NastavnikService
  ) {}

  ngOnInit(): void {
    this.nastavnikId = Number(this.route.snapshot.paramMap.get('id')); 

    this.nastavnikService.getById(this.nastavnikId).subscribe({
      next: (nastavnik) => {
        this.nastavnik = nastavnik;
      },
      error: (err) => {
        console.error('Greška pri dohvatanju nastavnika:', err);
      }
    });
  }
}
