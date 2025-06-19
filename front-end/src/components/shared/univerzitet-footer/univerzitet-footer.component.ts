import { Component } from '@angular/core';
import { Univerzitet } from '../../../app/models/Univerzitet';
import { UniverzitetService } from '../../../app/services/univerzitet.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-univerzitet-footer',
  imports: [CommonModule],
  templateUrl: './univerzitet-footer.component.html',
  styleUrl: './univerzitet-footer.component.css'
})
export class UniverzitetFooterComponent {

  univerzitet!: Univerzitet;


  constructor(
    private route: ActivatedRoute,
    private uService: UniverzitetService
  ) {}

  ngOnInit(): void {


    this.uService.getById(1).subscribe({
      next: (univerzitet) => {
        this.univerzitet= univerzitet;
      },
      error: (err) => {
        console.error('Greška pri dohvatanju univerziteta:', err);
      }
    });
  }
}
