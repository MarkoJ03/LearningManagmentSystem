import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IshodPredmeta } from '../../../models/IshodPredmeta';
import { IshodPredmetaService } from '../../../services/ishod-predmeta.service';

@Component({
  selector: 'app-ishod-predmeta',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ishod-predmeta.component.html',
  styleUrls: ['./ishod-predmeta.component.css']
})
export class IshodPredmetaComponent implements OnInit {
  ishodPredmeta: IshodPredmeta | null = null;

  constructor(
    private route: ActivatedRoute,
    private ishodPredmetaService: IshodPredmetaService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.ishodPredmetaService.getById(id).subscribe({
      next: (data) => {
        this.ishodPredmeta = data;
        console.log('ishod-predmeta:', data);
      },
      error: (err) => console.error('Greška prilikom učitavanja detalja:', err)
    });
  }
}
