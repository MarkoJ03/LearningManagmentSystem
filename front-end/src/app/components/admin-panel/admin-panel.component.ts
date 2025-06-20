import { Component } from '@angular/core';
import { AdminPanelSidebarComponent } from '../admin-panel-sidebar/admin-panel-sidebar.component';
import { AdminPanelHeaderComponent } from '../admin-panel-header/admin-panel-header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  imports: [RouterOutlet,AdminPanelSidebarComponent,AdminPanelHeaderComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

}
