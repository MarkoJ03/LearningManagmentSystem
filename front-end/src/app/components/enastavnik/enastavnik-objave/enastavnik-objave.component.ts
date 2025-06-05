import { Component } from '@angular/core';
import { ObjavaCardComponent } from '../../../../components/ui/objava-card/objava-card.component';
import { CommonModule } from '@angular/common';
import { ObjavaService } from '../../../services/objava.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enastavnik-objave',
  imports: [CommonModule, ObjavaCardComponent],
  templateUrl: './enastavnik-objave.component.html',
  styleUrl: './enastavnik-objave.component.css'
})
export class EnastavnikObjaveComponent {
  objave: any[] = [];
  nastavnikId!: number;

  constructor(private objavaService: ObjavaService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.objavaService.getAll().subscribe(data => {
      this.objave = data;
    });

    this.nastavnikId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    console.log('Ulogovani nastavnik ID:', this.nastavnikId);
  }
}
