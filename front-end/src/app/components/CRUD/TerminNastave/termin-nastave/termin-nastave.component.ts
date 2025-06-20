import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TerminNastave } from '../../../../models/TerminNastave';
import { TerminNastaveService } from '../../../../services/termin-nastave.service';

@Component({
  selector: 'app-termin-nastave',
  imports: [CommonModule, RouterLink],
  templateUrl: './termin-nastave.component.html',
  styleUrl: './termin-nastave.component.css'
})
export class TerminNastaveComponent {
  terminNastave: TerminNastave | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private terminNastaveService: TerminNastaveService
    ) {}
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = +params['id'];
        this.terminNastaveService.getById(id).subscribe(t => {
          this.terminNastave = t;
          console.log('Termin nastave:', t);
        });
      });
    }
}
