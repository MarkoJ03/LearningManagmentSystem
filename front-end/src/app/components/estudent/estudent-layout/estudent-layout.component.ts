import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EstudentHeaderComponent } from '../../estudent-header/estudent-header.component';
import { EstudentSidebarComponent } from '../../estudent-sidebar/estudent-sidebar.component';

@Component({
  selector: 'app-estudent-layout',
  imports: [ CommonModule,
    RouterModule,
    EstudentHeaderComponent,
    EstudentSidebarComponent, RouterOutlet],
  templateUrl: './estudent-layout.component.html',
  styleUrl: './estudent-layout.component.css'
})
export class EstudentLayoutComponent {

}
