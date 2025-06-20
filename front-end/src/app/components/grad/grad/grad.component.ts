import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Grad } from '../../../models/Grad';
import { gradService } from '../../../services/grad.service';

@Component({
  selector: 'app-grad',
  imports: [CommonModule, RouterLink],
  templateUrl: './grad.component.html',
  styleUrl: './grad.component.css'
})
export class GradComponent {

 grad: Grad | null = null;

 constructor(
    private route: ActivatedRoute,
    private gradService: gradService
  ) {}



  ngOnInit(): void {
  this.route.params.subscribe(params => {
    const id = +params['id'];
    if (!isNaN(id)) {
      this.gradService.getById(id).subscribe({
        next: (a) => {
          this.grad = a;
          console.log('Grad:', a);
        },
        error: (err) => {
          console.error('Greška sa servera:', err);
          this.grad = null;
        }
      });
    } else {
      console.error('ID nije validan.');
    }
  });
}

}
