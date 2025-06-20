import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Adresa } from '../../models/Adresa';
import { AdresaService } from '../../services/adresa.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-adresa',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './adresa.component.html',
  styleUrl: './adresa.component.css'
})
export class AdresaComponent {

  adresa: Adresa | null = null;

  constructor(
    private route: ActivatedRoute,
    private adresaService: AdresaService
  ) {}

  ngOnInit(): void {
  this.route.params.subscribe(params => {
    const id = +params['id'];
    if (!isNaN(id)) {
      this.adresaService.getById(id).subscribe({
        next: (a) => {
          this.adresa = a;
          console.log('Adresa:', a);
        },
        error: (err) => {
          console.error('Greška sa servera:', err);
          this.adresa = null;
        }
      });
    } else {
      console.error('ID nije validan.');
    }
  });
}

}
