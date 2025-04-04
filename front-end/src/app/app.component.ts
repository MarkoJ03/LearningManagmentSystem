import { Component } from '@angular/core';
import { UniverzitetHeaderComponent } from '../components/shared/univerzitet-header/univerzitet-header.component';
import { UniverzitetFooterComponent } from '../components/shared/univerzitet-footer/univerzitet-footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [UniverzitetHeaderComponent, UniverzitetFooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'App';
}
