import { Component } from '@angular/core';
import { BaseTableComponent } from '../../base-table/base-table.component';
import { Router, RouterLink } from '@angular/router';
import { Objava } from '../../../models/Objava';
import { ObjavaService } from '../../../services/objava.service';

@Component({
  selector: 'app-objave',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './objave.component.html',
  styleUrl: './objave.component.css'
})
export class ObjaveComponent {
  objave: Objava[] = [];
  kolone: string[] = ['naslov', 'sadrzaj', 'studentskaSluzba', 'vidljiv'];

  constructor(
    private objavaService: ObjavaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.objavaService.getAll().subscribe({
      next: (res) => {
        this.objave = res;
      },
      error: (err) => console.error('Greška prilikom učitavanja objava:', err),
    });
  }

  izmeni(objava: Objava): void {
    this.router.navigate(['/objave/izmeni', objava.id]);
  }

  obrisi(id: number): void {
    this.objavaService.delete(id).subscribe(() => {
      this.objave = this.objave.filter(o => o.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/objave', id]);
  }

  otkazi(): void {
    this.router.navigate(['/objave']);
  }
}
