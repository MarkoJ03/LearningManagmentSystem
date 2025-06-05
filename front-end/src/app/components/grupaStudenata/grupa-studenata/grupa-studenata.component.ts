import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GrupaStudenata } from '../../../models/GrupaStudenata';
import { GrupaStudenataService } from '../../../services/grupa-studenata.service';

@Component({
  selector: 'app-grupa-studenata',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './grupa-studenata.component.html',
  styleUrls: ['./grupa-studenata.component.css']
})
export class GrupaStudenataComponent {

  grupa: GrupaStudenata | null = null;

  constructor(
    private route: ActivatedRoute,
    private grupaService: GrupaStudenataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.grupaService.getById(id).subscribe(g => {
        this.grupa = g;
        console.log('Grupa studenata:', g);
      });
    });
  }

}
