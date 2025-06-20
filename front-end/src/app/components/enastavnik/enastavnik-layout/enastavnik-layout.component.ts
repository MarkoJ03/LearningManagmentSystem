import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EnastavnikSidebarComponent } from '../enastavnik-sidebar/enastavnik-sidebar.component';

@Component({
  selector: 'app-enastavnik-layout',
  imports: [CommonModule, RouterModule, EnastavnikSidebarComponent, RouterOutlet],
  templateUrl: './enastavnik-layout.component.html',
  styleUrl: './enastavnik-layout.component.css'
})
export class EnastavnikLayoutComponent {

}
