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


prikazaneObjave: any[] = [];

brojPoStrani: number = 3;
trenutnaStranica: number = 1;
ukupnoStranica: number = 1;

ngOnInit(): void {
  this.objavaService.getAll().subscribe(data => {
    this.objave = data;
    this.ukupnoStranica = Math.ceil(this.objave.length / this.brojPoStrani);
    this.osveziStranicu();
  });
}

osveziStranicu(): void {
  const start = (this.trenutnaStranica - 1) * this.brojPoStrani;
  const end = start + this.brojPoStrani;
  this.prikazaneObjave = this.objave.slice(start, end);
}

idiNaStranicu(broj: number): void {
  if (broj >= 1 && broj <= this.ukupnoStranica) {
    this.trenutnaStranica = broj;
    this.osveziStranicu();
  }
}
}
