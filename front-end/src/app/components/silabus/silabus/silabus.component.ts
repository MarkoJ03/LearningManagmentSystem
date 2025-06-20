import { Component } from '@angular/core';
import { Silabus } from '../../../models/Silabus';
import { SilabusService } from '../../../services/silabus.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-silabus',
  imports: [CommonModule, RouterLink],
  templateUrl: './silabus.component.html',
  styleUrl: './silabus.component.css'
})
export class SilabusComponent {

silabus: Silabus | null = null;

constructor(
    private route: ActivatedRoute,
    private silabusService: SilabusService
  ) {}

ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = +params['id'];
        this.silabusService.getById(id).subscribe(f => {
          this.silabus = f;
          console.log('Fakultet:', f);
        });
      });
    }


}
