import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Obavestenje } from '../../../../models/Obavestenje';
import { ObavestenjeService } from '../../../../services/obavestenje.service';

@Component({
  selector: 'app-obavestenje',
  imports: [CommonModule, RouterLink],
  templateUrl: './obavestenje.component.html',
  styleUrl: './obavestenje.component.css'
})
export class ObavestenjeComponent {
  obavestenje: Obavestenje | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private obavestenjeService: ObavestenjeService
    ) {}
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = +params['id'];
        this.obavestenjeService.getById(id).subscribe(o => {
          this.obavestenje = o;
          console.log('Obavestenje:', o);
        });
      });
    }
}
