import { Component } from '@angular/core';
import { BaseTableComponent } from '../../base-table/base-table.component';
import { Router, RouterLink } from '@angular/router';
import { Departman } from '../../../models/Departaman';
import { DepartmanService } from '../../../services/departman.service';
import { DepartmanNastavnikService } from '../../../services/departman-nastavnik.service';

@Component({
  selector: 'app-departmani',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './departmani.component.html',
  styleUrl: './departmani.component.css'
})
export class DepartmaniComponent {


  departmani: Departman[] = [];
  kolone: string[] = ['naziv', 'fakultet','sekretar','direktorDepartmana','nastavnici'];

  constructor(
    private departmanService: DepartmanService,
    private departmanNastavnikService: DepartmanNastavnikService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.departmanService.getAll().subscribe({
      next: (res) => {
        this.departmani = res.map(n => ({
          ...n,
          
          sekretar: n.sekretarDepartmana ? `${n.sekretarDepartmana.ime} ${n.sekretarDepartmana.prezime}` : ""
          
        }));
      },
      error: (err) => console.error('Greška prilikom učitavanja nastavnika:', err),
    });
  }


  izmeni(departman: Departman): void {
    this.router.navigate(['/departmani/izmeni', departman.id]);
  }

  obrisi(id: number): void {
    this.departmanService.delete(id).subscribe(() => {
      this.departmani = this.departmani.filter(v => v.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/departmani', id]);
  }

  otkazi(): void {
    this.router.navigate(['/departmani']);
  }
}
