import { Component } from '@angular/core';
import { UniverzitetHeaderComponent } from '../univerzitet-header/univerzitet-header.component';
import { UniverzitetFooterComponent } from '../univerzitet-footer/univerzitet-footer.component';
import { ObjavaCardComponent } from '../../ui/objava-card/objava-card.component';
import { UserHeaderComponent } from '../user-header/user-header.component';

@Component({
  selector: 'app-layout',
  imports: [UniverzitetHeaderComponent, UniverzitetFooterComponent, ObjavaCardComponent, UserHeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
