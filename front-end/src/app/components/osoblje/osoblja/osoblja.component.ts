import { Component, OnInit } from '@angular/core';
import { Osoblje } from '../../../models/Osoblje';
import { OsobljeService } from '../../../services/osoblje.service';
import { Router } from '@angular/router';
import { BaseTableComponent } from '../../base-table/base-table.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-osoblja',
  standalone: true,
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './osoblja.component.html',
  styleUrls: ['./osoblja.component.css']
})
export class OsobljaComponent implements OnInit {
  osoblja: Osoblje[] = [];
  kolone: string[] = ['ime', 'prezime', 'jmbg', 'studentska_sluzba', 'vidljiv'];

  constructor(
    private osobljeService: OsobljeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.osobljeService.getAll().subscribe(res => {
      this.osoblja = res;
    });
  }

  izmeni(osoblje: Osoblje): void {
    this.router.navigate(['/osoblje/izmeni', osoblje.id]);
  }

  obrisi(id: number): void {
    this.osobljeService.delete(id).subscribe(() => {
      this.osoblja = this.osoblja.filter(o => o.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/osoblje', id]);
  }
}
