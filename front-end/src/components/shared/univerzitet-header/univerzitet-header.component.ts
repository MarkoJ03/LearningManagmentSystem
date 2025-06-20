import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FakultetService } from '../../../app/services/fakultet.service';
import { Fakultet } from '../../../app/models/Fakultet';
import { OnHoverDisplayDirective } from '../../../directives/on-hover-display.directive';
import { StudijskiProgramService } from '../../../app/services/studijski-program.service';
import { StudijskiProgram } from '../../../app/models/StudijskiProgram';
import { Univerzitet } from '../../../app/models/Univerzitet';
import { UniverzitetService } from '../../../app/services/univerzitet.service';


@Component({
  selector: 'app-univerzitet-header',
  standalone: true,
  imports: [CommonModule, RouterModule,OnHoverDisplayDirective],
  templateUrl: './univerzitet-header.component.html',
  styleUrls: ['./univerzitet-header.component.css']
})
export class UniverzitetHeaderComponent implements OnInit {
  fakulteti: Fakultet[] = [];
  studijskiProgrami: StudijskiProgram[] = [];
  univerzitet!: Univerzitet;
  

  constructor(private fakultetService: FakultetService, private studijskiProgramService: StudijskiProgramService,private uService: UniverzitetService) {}

  ngOnInit(): void {
    this.fakultetService.getAll().subscribe({
      next: (data) => (this.fakulteti = data),
      error: (err) => console.error('Greška pri dohvatu fakulteta:', err)
    });

    this.uService.getById(1).subscribe({
      next: (univerzitet) => {
        this.univerzitet= univerzitet;
      },
      error: (err) => {
        console.error('Greška pri dohvatanju univerziteta:', err);
      }
    });
  

    this.studijskiProgramService.getAll().subscribe({
      next: (data) => (this.studijskiProgrami = data),
      error: (err) => console.error('Greška pri dohvatu programa:', err)
    });
  }
}
