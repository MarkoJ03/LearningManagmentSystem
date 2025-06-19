import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipPrograma } from '../../../models/TipPrograma';
import { TipProgramaService } from '../../../services/tip-programa.service';
import { BaseTableComponent } from '../../base-table/base-table.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tipovi-programa',
  standalone: true,
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './tipovi-programa.component.html',
  styleUrls: ['./tipovi-programa.component.css']
})
export class TipoviProgramaComponent implements OnInit {
  tipoviPrograma: TipPrograma[] = [];
  
  kolone: string[] = ['naziv', 'vidljiv', 'studijskiProgramiNaziv']; 

  constructor(
    private service: TipProgramaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getAll().subscribe({
  next: (res) => {
    this.tipoviPrograma = res.map(n => ({
      ...n,
      
    studijskiProgramiNaziv: n.programi?.map(o => o.naziv).join(', ') || ''
    }));
  },
  error: (err) => console.error('Greška prilikom učitavanja nastavnika:', err),
});

  }
  izmeni(tipPrograma: TipPrograma): void {
    this.router.navigate(['/tipovi-programa/izmeni', tipPrograma.id]);
  }

  obrisi(id: number): void {
    this.service.delete(id).subscribe(() => {
      this.tipoviPrograma = this.tipoviPrograma.filter(tp => tp.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/tipovi-programa', id]);
  }

  otkazi(): void {
  this.router.navigate(['/tipovi-programa']); 
}
}
