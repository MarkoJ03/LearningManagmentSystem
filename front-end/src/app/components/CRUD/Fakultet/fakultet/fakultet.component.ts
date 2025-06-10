import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Fakultet } from '../../../../models/Fakultet';
import { Departman } from '../../../../models/Departaman';
import { FakultetService } from '../../../../services/fakultet.service';

@Component({
  selector: 'app-fakultet',
  imports: [CommonModule, RouterLink],
  templateUrl: './fakultet.component.html',
  styleUrl: './fakultet.component.css'
})
export class FakultetComponent {
  fakultet: Fakultet | null = null;
  departmani: Departman[] = [];
  
    constructor(
      private route: ActivatedRoute,
      private fakultetService: FakultetService
    ) {}
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = +params['id'];
        this.fakultetService.getById(id).subscribe(f => {
          this.fakultet = f;
          console.log('Fakultet:', f);
        });
      });
    }
}
