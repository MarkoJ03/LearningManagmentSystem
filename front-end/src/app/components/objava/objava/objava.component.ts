import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Objava } from '../../../models/Objava';
import { ObjavaService } from '../../../services/objava.service';

@Component({
  selector: 'app-objava',
  imports: [CommonModule, RouterLink],
  templateUrl: './objava.component.html',
  styleUrl: './objava.component.css'
})
export class ObjavaComponent {
  objava: Objava | null = null;

  constructor(
    private route: ActivatedRoute,
    private objavaService: ObjavaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.objavaService.getById(id).subscribe(o => {
        this.objava = o;
        console.log('Objava:', o);
      });
    });
  }
}
