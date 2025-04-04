import { Component } from '@angular/core';
import { OnHoverDisplayDirective } from '../../../directives/on-hover-display.directive';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-univerzitet-header',
  imports: [OnHoverDisplayDirective, RouterLink],
  templateUrl: './univerzitet-header.component.html',
  styleUrl: './univerzitet-header.component.css'
})
export class UniverzitetHeaderComponent {

}
