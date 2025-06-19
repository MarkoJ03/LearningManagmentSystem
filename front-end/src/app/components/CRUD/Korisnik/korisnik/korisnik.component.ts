import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Korisnik } from '../../../../models/Korisnik';
import { KorisnikService } from '../../../../services/korisnik.service';
import { DodeljenoPravoPristupa } from '../../../../models/DodeljenoPravoPristupa';

@Component({
  selector: 'app-korisnik',
  imports: [CommonModule, RouterLink],
  templateUrl: './korisnik.component.html',
  styleUrl: './korisnik.component.css'
})
export class KorisnikComponent {
  korisnik: Korisnik | null = null;
  dodeljenaPravaPristupa: DodeljenoPravoPristupa[] = [];

  constructor(
    private route: ActivatedRoute,
    private korisnikService: KorisnikService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.korisnikService.getById(id).subscribe(k => {
        this.korisnik = k;
        console.log('Korisnik:', k);
      });
    });
  }
}
