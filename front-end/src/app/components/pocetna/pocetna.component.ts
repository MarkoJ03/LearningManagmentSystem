import { Component } from '@angular/core';
import { ObjavaService } from '../../services/objava.service';
import { CommonModule } from '@angular/common';
import { ObjavaCardComponent } from '../../../components/ui/objava-card/objava-card.component';
import { UniverzitetFooterComponent } from '../../../components/shared/univerzitet-footer/univerzitet-footer.component';
import { UniverzitetHeaderComponent } from '../../../components/shared/univerzitet-header/univerzitet-header.component';

@Component({
  selector: 'app-pocetna',
  imports: [CommonModule, ObjavaCardComponent],
  templateUrl: './pocetna.component.html',
  styleUrl: './pocetna.component.css'
})
export class PocetnaComponent {

  objave: any[] = [];

  constructor(private objavaService: ObjavaService) {}

  ngOnInit(): void {
    this.objavaService.getAll().subscribe(data => {
      this.objave = data;
    });
  }
}
