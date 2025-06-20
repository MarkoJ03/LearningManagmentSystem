import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BaseTableComponent } from '../base-table/base-table.component';
import { Grad } from '../../models/Grad';
import { gradService } from '../../services/grad.service';

@Component({
  selector: 'app-grad',
  imports: [BaseTableComponent, RouterLink],
  templateUrl: './grad.component.html',
  styleUrl: './grad.component.css'
})
export class GradComponent {


  
  grad: Grad[] = [];
  kolone: string[] = ['naziv', 'drzava', 'vidljiv'];

  constructor(
    private gradService: gradService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gradService.getAll().subscribe({
      next: (res) => this.grad = res,
      error: (err) => console.error('Greška prilikom učitavanja adresa:', err),
    });
  }

  izmeni(grad: Grad): void {
    this.router.navigate(['/Grad/izmeni', grad.id]);
  }

  obrisi(id: number): void {
    this.gradService.delete(id).subscribe(() => {
      this.grad = this.grad.filter(a => a.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/Grad', id]);
  }

  otkazi(): void {
    this.router.navigate(['/Grad']);
  }
}
