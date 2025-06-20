import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Zvanje } from '../../../../models/Zvanje';
import { ZvanjeService } from '../../../../services/zvanje.service';

@Component({
  selector: 'app-zvanje',
  imports: [CommonModule, RouterLink],
  templateUrl: './zvanje.component.html',
  styleUrl: './zvanje.component.css'
})
export class ZvanjeComponent {
  zvanje: Zvanje | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private zvanjeService: ZvanjeService
    ) {}
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = +params['id'];
        this.zvanjeService.getById(id).subscribe(z => {
          this.zvanje = z;
          console.log('Zvanje:', z);
        });
      });
    }
}
