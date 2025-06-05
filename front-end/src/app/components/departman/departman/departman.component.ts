import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Departman } from '../../../models/Departaman';
import { DepartmanService } from '../../../services/departman.service';

@Component({
  selector: 'app-departman',
  imports: [CommonModule,RouterLink],
  templateUrl: './departman.component.html',
  styleUrl: './departman.component.css'
})
export class DepartmanComponent {


departman: Departman | null = null;

  constructor(
    private route: ActivatedRoute,
    private departmanService: DepartmanService
  ) {}

ngOnInit(): void {
  this.route.params.subscribe(params => {
    const id = +params['id'];
    this.departmanService.getById(id).subscribe(d => {
      this.departman = d;
      console.log('Departman:', d);
    });
  });
}

}
