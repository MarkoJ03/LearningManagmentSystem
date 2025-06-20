import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Korisnik } from '../../models/Korisnik';
import { KorisnikService } from '../../services/korisnik.service';

@Component({
  selector: 'app-admin-panel-sidebar',
  imports: [RouterLink],
  templateUrl: './admin-panel-sidebar.component.html',
  styleUrl: './admin-panel-sidebar.component.css'
})
export class AdminPanelSidebarComponent implements OnInit {

korisnik!: Korisnik;
  korisnikId!: number;

  constructor(
    private route: ActivatedRoute,
    private korisnikService: KorisnikService
  ) {}

  ngOnInit(): void {
    this.korisnikId = Number(this.route.snapshot.paramMap.get('id')); 

    this.korisnikService.getById(this.korisnikId).subscribe({
      next: (korisnik) => {
        this.korisnik= korisnik;
      },
      error: (err) => {
        console.error('Greška pri dohvatanju korisnik:', err);
      }
    });
  }
}
