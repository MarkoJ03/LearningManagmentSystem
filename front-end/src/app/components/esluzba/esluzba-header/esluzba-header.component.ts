import { Component } from '@angular/core';
import { Osoblje } from '../../../models/Osoblje';
import { OsobljeService } from '../../../services/osoblje.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-esluzba-header',
  imports: [],
  templateUrl: './esluzba-header.component.html',
  styleUrl: './esluzba-header.component.css'
})
export class EsluzbaHeaderComponent {

 osoblje!: Osoblje;
  osobljeId!: number;

  constructor(
    private route: ActivatedRoute,
    private osobljeService: OsobljeService
  ) {}

  ngOnInit(): void {
    this.osobljeId = Number(this.route.snapshot.paramMap.get('id')); 

    this.osobljeService.getById(this.osobljeId).subscribe({
      next: (osoblje) => {
        this.osoblje= osoblje;
      },
      error: (err) => {
        console.error('Greška pri dohvatanju osoblja:', err);
      }
    });
  }
}
