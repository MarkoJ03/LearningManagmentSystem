import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Kalendar } from '../../../models/Kalendar';
import { KalendarService } from '../../../services/kalendar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kalendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kalendar.component.html',
  styleUrls: ['./kalendar.component.css']
})
export class KalendarComponent implements OnInit {
  kalendar: Kalendar | null = null;

  constructor(
    private route: ActivatedRoute,
    private kalendarService: KalendarService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.kalendarService.getById(id).subscribe(data => {
      this.kalendar = data;
    });
  }
}
