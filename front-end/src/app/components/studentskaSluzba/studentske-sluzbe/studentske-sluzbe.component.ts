import { Component, OnInit } from '@angular/core';
import { StudentskaSluzba } from '../../../models/StudentskaSluzba';
import { StudentskaSluzbaService } from '../../../services/studentska-sluzba.service';
import { Router, RouterLink } from '@angular/router';
import { BaseTableComponent } from '../../base-table/base-table.component';

@Component({
  selector: 'app-studentske-sluzbe',
  standalone: true,
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './studentske-sluzbe.component.html',
  styleUrls: ['./studentske-sluzbe.component.css']
})
export class StudentskeSluzbeComponent implements OnInit {
  sluzbe: StudentskaSluzba[] = [];
  kolone: string[] = [
    'id', 'vidljiv',
    'naslovObjave', 'inventari', 'biblioteke',
   'kalendari', 'studenti', 'obrasci'
  ];

  constructor(
    private sluzbaService: StudentskaSluzbaService,
    private router: Router
  ) {}
ngOnInit(): void {
    this.sluzbaService.getAll().subscribe({
  next: (res) => {
    this.sluzbe = res.map(n => ({
      ...n,
      
    naslovObjave: n.objave?.map(o => o.naslov).join(', ') || '',
    

    }));
  },
  error: (err) => console.error('Greška prilikom učitavanja nastavnika:', err),
});

  }

  izmeni(sluzba: StudentskaSluzba): void {
    this.router.navigate(['/studentske-sluzbe/izmeni', sluzba.id]);
  }

  obrisi(id: number): void {
    this.sluzbaService.delete(id).subscribe(() => {
      this.sluzbe = this.sluzbe.filter(s => s.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/studentska-sluzba', id]);
  }

 otkazi(id: number): void {
    this.router.navigate(['/studentske-sluzbe']);
  }
}
