import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-objava-card',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './objava-card.component.html',
  styleUrls: ['./objava-card.component.css']
})
export class ObjavaCardComponent {
  @Input() naslov!: string;
  @Input() sadrzaj!: string;
  @Input() id!: number;

}
