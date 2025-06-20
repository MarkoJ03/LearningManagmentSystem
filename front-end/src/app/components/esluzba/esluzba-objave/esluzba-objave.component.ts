import { Component } from '@angular/core';
import { ObjavaService } from '../../../services/objava.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ObjavaCardComponent } from '../../../../components/ui/objava-card/objava-card.component';

@Component({
  selector: 'app-esluzba-objave',
  imports: [CommonModule, ObjavaCardComponent,RouterLink],
  templateUrl: './esluzba-objave.component.html',
  styleUrl: './esluzba-objave.component.css'
})
export class EsluzbaObjaveComponent {

  objave: any[] = [];



  constructor(private objavaService: ObjavaService, private route: ActivatedRoute) {}

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
