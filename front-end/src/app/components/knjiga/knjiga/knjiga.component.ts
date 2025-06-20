import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Knjiga } from '../../../models/Knjiga';
import { KnjigaService } from '../../../services/knjiga.service';

@Component({
  selector: 'app-knjiga',
  imports: [CommonModule, RouterLink],
  templateUrl: './knjiga.component.html',
  styleUrl: './knjiga.component.css'
})
export class KnjigaComponent {
  knjiga: Knjiga | null = null;

  constructor(
    private route: ActivatedRoute,
    private knjigaService: KnjigaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.knjigaService.getById(id).subscribe(k => {
        this.knjiga = k;
        console.log('Knjiga:', k);
      });
    });
  }
}
