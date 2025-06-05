import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Osoblje } from '../../../models/Osoblje';
import { OsobljeService } from '../../../services/osoblje.service';

@Component({
  selector: 'app-osoblje',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './osoblje.component.html',
  styleUrls: ['./osoblje.component.css']
})
export class OsobljeComponent {
  osoblje: Osoblje | null = null;

  constructor(
    private route: ActivatedRoute,
    private osobljeService: OsobljeService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.osobljeService.getById(id).subscribe(data => {
      this.osoblje = data;
    });
  }
}
