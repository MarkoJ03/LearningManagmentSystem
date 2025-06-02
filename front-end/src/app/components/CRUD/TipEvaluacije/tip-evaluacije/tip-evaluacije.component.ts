import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TipEvaluacije } from '../../../../models/TipEvaluacije';
import { TipEvaluacijeService } from '../../../../services/tip-evaluacije.service';

@Component({
  selector: 'app-tip-evaluacije',
  imports: [CommonModule, RouterLink],
  templateUrl: './tip-evaluacije.component.html',
  styleUrl: './tip-evaluacije.component.css'
})
export class TipEvaluacijeComponent {
  tipEvaluacije: TipEvaluacije | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private tipEvaluacijeService: TipEvaluacijeService
    ) {}
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = +params['id'];
        this.tipEvaluacijeService.getById(id).subscribe(t => {
          this.tipEvaluacije = t;
          console.log('Tip evaluacije:', t);
        });
      });
    }
}
