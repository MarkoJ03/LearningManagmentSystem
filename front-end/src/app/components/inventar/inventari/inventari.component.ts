import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Inventar } from '../../../models/Inventar';
import { InventarService } from '../../../services/inventar.service';

import { BaseTableComponent } from '../../base-table/base-table.component';

@Component({
  selector: 'app-inventari',
  standalone: true,
  imports: [BaseTableComponent,RouterLink],
  templateUrl: './inventari.component.html',
  styleUrls: ['./inventari.component.css']
})
export class InventariComponent implements OnInit {
  inventari: Inventar[] = [];
  kolone: string[] = ['id', 'vidljiv', 'studentskaSluzba'];

  constructor(
    private service: InventarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (res) => (this.inventari = res),
      error: (err) => console.error('Greška:', err)
    });
  }

  izmeni(inventar: Inventar): void {
    this.router.navigate(['/inventari/izmeni', inventar.id]);
  }

  obrisi(id: number): void {
    this.service.delete(id).subscribe(() => {
      this.inventari = this.inventari.filter(i => i.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/inventari', id]);
  }
}
