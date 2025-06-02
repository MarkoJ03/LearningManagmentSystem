import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TipZvanjaService } from '../../../../services/tip-zvanja.service';
import { TipZvanja } from '../../../../models/TipZvanja';

@Component({
  selector: 'app-tip-zvanja',
  imports: [CommonModule, RouterLink],
  templateUrl: './tip-zvanja.component.html',
  styleUrl: './tip-zvanja.component.css'
})
export class TipZvanjaComponent {
  tipZvanja: TipZvanja | null = null;

  constructor(
    private route: ActivatedRoute,
    private tipZvanjaService: TipZvanjaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.tipZvanjaService.getById(id).subscribe(t => {
        this.tipZvanja = t;
        console.log('Tip zvanja:', t);
      });
    });
  }
}
