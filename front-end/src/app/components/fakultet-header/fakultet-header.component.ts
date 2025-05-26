import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Fakultet } from '../../models/Fakultet';
import { OnHoverDisplayDirective } from '../../../directives/on-hover-display.directive';
import { FakultetService } from '../../services/fakultet.service';


@Component({
  selector: 'app-fakultet-header',
  standalone: true,
  imports: [CommonModule,OnHoverDisplayDirective],
  templateUrl: './fakultet-header.component.html',
  styleUrls: ['./fakultet-header.component.css']
})
export class FakultetHeaderComponent implements OnInit {
  fakultet: Fakultet | null = null;

  constructor(
    private route: ActivatedRoute,
    private fakultetService: FakultetService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? parseInt(idParam, 10) : null;

    if (id !== null && !isNaN(id)) {
      this.fakultetService.getById(id).subscribe({
        next: (data: Fakultet) => {
          this.fakultet = data;
        },
        error: (err) => {
          console.error('Greška pri dohvatanju fakulteta:', err);
        }
      });
    }
  }
}
