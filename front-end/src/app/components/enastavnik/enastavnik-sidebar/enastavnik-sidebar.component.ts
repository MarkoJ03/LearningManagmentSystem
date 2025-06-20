import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Nastavnik } from '../../../models/Nastavnik';
import { NastavnikService } from '../../../services/nastavnik.service';
import { CommonModule } from '@angular/common';
import { LogoutService } from '../../../../services/logout.service';

@Component({
  selector: 'app-enastavnik-sidebar',
  templateUrl: './enastavnik-sidebar.component.html',
  styleUrl: './enastavnik-sidebar.component.css',
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class EnastavnikSidebarComponent implements OnInit {
  nastavnik!: Nastavnik;
  nastavnikId!: number;
  uKontekstuPredmeta: boolean = false;
  predmetId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private logoutService: LogoutService,
    private nastavnikService: NastavnikService
  ) { }

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

    // Posmatra promenu ruta zbog children-a predmeta
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const url = this.router.url;
      const match = url.match(/\/predmeti\/(\d+)/); // gleda da li je u URL-u predmet
      if (match) {
        this.predmetId = +match[1];
        this.uKontekstuPredmeta = true;
      } else {
        this.predmetId = null;
        this.uKontekstuPredmeta = false;
      }
    });
  }

  logout(event: Event): void {
    event.preventDefault();
    this.logoutService.logout();
  }
}
