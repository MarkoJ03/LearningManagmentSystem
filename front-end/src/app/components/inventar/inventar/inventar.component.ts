import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inventar } from '../../../models/Inventar';
import { InventarService } from '../../../services/inventar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventar.component.html',
  styleUrls: ['./inventar.component.css']
})
export class InventarComponent implements OnInit {
  inventar: Inventar | null = null;

  constructor(
    private route: ActivatedRoute,
    private service: InventarService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.service.getById(id).subscribe({
      next: (data) => (this.inventar = data),
      error: (err) => console.error('Greška:', err)
    });
  }
}
