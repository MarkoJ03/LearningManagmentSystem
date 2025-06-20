import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentskaSluzba } from '../../../models/StudentskaSluzba';
import { StudentskaSluzbaService } from '../../../services/studentska-sluzba.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studentska-sluzba',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './studentska-sluzba.component.html',
  styleUrls: ['./studentska-sluzba.component.css']
})
export class StudentskaSluzbaComponent implements OnInit {
  sluzba: StudentskaSluzba | null = null;

  constructor(
    private route: ActivatedRoute,
    private service: StudentskaSluzbaService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.service.getById(id).subscribe({
      next: (data) => (this.sluzba = data),
      error: (err) => console.error('Greška:', err)
    });
  }
}
