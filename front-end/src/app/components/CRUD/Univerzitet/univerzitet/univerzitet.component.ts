import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Univerzitet } from '../../../../models/Univerzitet';
import { UniverzitetService } from '../../../../services/univerzitet.service';
import { Fakultet } from '../../../../models/Fakultet';

@Component({
  selector: 'app-univerzitet',
  imports: [CommonModule, RouterLink],
  templateUrl: './univerzitet.component.html',
  styleUrl: './univerzitet.component.css'
})
export class UniverzitetComponent {
  univerzitet: Univerzitet | null = null;
  fakulteti: Fakultet[] | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private univerzitetService: UniverzitetService
    ) {}
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = +params['id'];
        this.univerzitetService.getById(id).subscribe(u => {
          this.univerzitet = u;
          console.log('Univerzitet:', u);
        });
      });
    }
}
