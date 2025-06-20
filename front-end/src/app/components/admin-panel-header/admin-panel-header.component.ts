import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../../models/Korisnik';
import { KorisnikService } from '../../services/korisnik.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-panel-header',
  imports: [CommonModule],
  templateUrl: './admin-panel-header.component.html',
  styleUrl: './admin-panel-header.component.css'
})
export class AdminPanelHeaderComponent implements OnInit {

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
