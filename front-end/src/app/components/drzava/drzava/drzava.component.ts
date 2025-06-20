import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Drzava } from '../../../models/Drzava';
import { DrzavaService } from '../../../services/drzava.service';

@Component({
  selector: 'app-drzava',
  imports: [CommonModule, RouterLink],
  templateUrl: './drzava.component.html',
  styleUrl: './drzava.component.css'
})
export class DrzavaComponent {


drzava: Drzava | null = null;

constructor(
    private route: ActivatedRoute,
    private drzavaService: DrzavaService
  ) {}

ngOnInit(): void {
  this.route.params.subscribe(params => {
    const id = +params['id'];
    if (!isNaN(id)) {
      this.drzavaService.getById(id).subscribe({
        next: (a) => {
          this.drzava = a;
          console.log('Drzava:', a);
        },
        error: (err) => {
          console.error('Greška sa servera:', err);
          this.drzava = null;
        }
      });
    } else {
      console.error('ID nije validan.');
    }
  });
}


}
