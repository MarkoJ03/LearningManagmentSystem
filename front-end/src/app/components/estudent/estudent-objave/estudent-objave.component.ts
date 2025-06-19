import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudentHeaderComponent } from '../estudent-header/estudent-header.component';

import { ObjavaService } from '../../../services/objava.service';
import { ObjavaCardComponent } from '../../../../components/ui/objava-card/objava-card.component';
import { ActivatedRoute } from '@angular/router';
import { EstudentSidebarComponent } from '../estudent-sidebar/estudent-sidebar.component';

@Component({
  selector: 'app-estudent-objave',
  standalone: true,
  imports: [
    CommonModule,
    ObjavaCardComponent
  ],
  templateUrl: './estudent-objave.component.html',
  styleUrls: ['./estudent-objave.component.css']
})
export class EstudentObjaveComponent {
  objave: any[] = [];
  studentNaGodiniId!: number;


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
