import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Osoblje } from '../../../models/Osoblje';
import { OsobljeService } from '../../../services/osoblje.service';
import { LogoutService } from '../../../../services/logout.service';

@Component({
  selector: 'app-esluzba-sidebar',
  imports: [RouterLink],
  templateUrl: './esluzba-sidebar.component.html',
  styleUrl: './esluzba-sidebar.component.css'
})
export class EsluzbaSidebarComponent {

 osoblje!: Osoblje;
  osobljeId!: number;

  constructor(
    private route: ActivatedRoute,
    private osobljeService: OsobljeService,
    private logoutService: LogoutService
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


    logout(event: Event): void {
    event.preventDefault();
    this.logoutService.logout();
  }
}

