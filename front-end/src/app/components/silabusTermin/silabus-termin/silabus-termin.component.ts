import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SilabusTermin } from '../../../models/SilabusTermin';
import { SilabusTerminService } from '../../../services/silabus-termin.service';

@Component({
  selector: 'app-silabus-termin',
  imports: [CommonModule, RouterLink],
  templateUrl: './silabus-termin.component.html',
  styleUrl: './silabus-termin.component.css'
})
export class SilabusTerminComponent {



  
  silabusTermin: SilabusTermin | null = null;

  constructor(
    private route: ActivatedRoute,
    private silabusTerminService: SilabusTerminService
  ) {}

  ngOnInit(): void {
  this.route.params.subscribe(params => {
    const id = +params['id'];
    if (!isNaN(id)) {
      this.silabusTerminService.getById(id).subscribe({
        next: (a) => {
          this.silabusTermin = a;
          console.log('Adresa:', a);
        },
        error: (err) => {
          console.error('Greška sa servera:', err);
          this.silabusTermin = null;
        }
      });
    } else {
      console.error('ID nije validan.');
    }
  });
}

}
