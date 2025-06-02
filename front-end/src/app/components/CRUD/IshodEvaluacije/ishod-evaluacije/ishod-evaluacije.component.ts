import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IshodEvaluacije } from '../../../../models/IshodEvaluacije';
import { IshodEvaluacijeService } from '../../../../services/ishod-evaluacije.service';

@Component({
  selector: 'app-ishod-evaluacije',
  imports: [CommonModule, RouterLink],
  templateUrl: './ishod-evaluacije.component.html',
  styleUrl: './ishod-evaluacije.component.css'
})
export class IshodEvaluacijeComponent {
  ishodEvaluacije: IshodEvaluacije | null = null;

  constructor(
    private route: ActivatedRoute,
    private ishodEvaluacijeService: IshodEvaluacijeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.ishodEvaluacijeService.getById(id).subscribe(i => {
        this.ishodEvaluacije = i;
        console.log('Ishod Evaluacije:', i);
      });
    });
  }
}
