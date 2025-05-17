import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FakultetService } from '../../../app/services/fakultet.service';
import { Fakultet } from '../../../app/models/Fakultet';
import { OnHoverDisplayDirective } from '../../../directives/on-hover-display.directive';


@Component({
  selector: 'app-univerzitet-header',
  standalone: true,
  imports: [CommonModule, RouterModule,OnHoverDisplayDirective],
  templateUrl: './univerzitet-header.component.html',
  styleUrls: ['./univerzitet-header.component.css']
})
export class UniverzitetHeaderComponent implements OnInit {
  fakulteti: Fakultet[] = [];

  constructor(private fakultetService: FakultetService) {}

  ngOnInit(): void {
    this.fakultetService.getAll().subscribe({
      next: (data) => (this.fakulteti = data),
      error: (err) => console.error('Greška pri dohvatu fakulteta:', err)
    });
  }
}
