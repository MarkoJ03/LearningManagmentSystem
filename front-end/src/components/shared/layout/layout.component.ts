import { Component } from '@angular/core';
import { UniverzitetHeaderComponent } from '../univerzitet-header/univerzitet-header.component';
import { UniverzitetFooterComponent } from '../univerzitet-footer/univerzitet-footer.component';

@Component({
  selector: 'app-layout',
  imports: [UniverzitetHeaderComponent, UniverzitetFooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
