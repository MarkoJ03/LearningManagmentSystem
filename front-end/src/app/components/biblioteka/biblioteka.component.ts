import { Component } from '@angular/core';
import { BibliotekaService } from '../../services/biblioteka.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Biblioteka } from '../../models/Biblioteka';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-biblioteka',
  imports: [CommonModule,RouterLink],
  templateUrl: './biblioteka.component.html',
  styleUrl: './biblioteka.component.css'
})
export class BibliotekaComponent {


    biblioteka: Biblioteka | null = null;

  constructor(
    private route: ActivatedRoute,
    private bibliotekaService: BibliotekaService
  ) {}

ngOnInit(): void {
  this.route.params.subscribe(params => {
    const id = +params['id'];
    this.bibliotekaService.getById(id).subscribe(b => {
      this.biblioteka = b;
      console.log('Biblioteka:', b);
    });
  });
}

}
