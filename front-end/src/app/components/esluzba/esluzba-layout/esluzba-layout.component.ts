import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EsluzbaSidebarComponent } from '../esluzba-sidebar/esluzba-sidebar.component';
import { EsluzbaHeaderComponent } from '../esluzba-header/esluzba-header.component';

@Component({
  selector: 'app-esluzba-layout',
  imports: [RouterOutlet,EsluzbaSidebarComponent,EsluzbaHeaderComponent],
  templateUrl: './esluzba-layout.component.html',
  styleUrl: './esluzba-layout.component.css'
})
export class EsluzbaLayoutComponent {

}
