import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniverzitetHeaderComponent } from '../univerzitet-header/univerzitet-header.component';
import { UniverzitetFooterComponent } from '../univerzitet-footer/univerzitet-footer.component';
import { ObjavaCardComponent } from '../../ui/objava-card/objava-card.component';
import { ObjavaService } from '../../../app/services/objava.service';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    UniverzitetHeaderComponent,
    UniverzitetFooterComponent,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  objave: any[] = [];

  constructor(private objavaService: ObjavaService) {}

  ngOnInit(): void {
    this.objavaService.getAll().subscribe(data => {
      this.objave = data;
    });
  }
}
