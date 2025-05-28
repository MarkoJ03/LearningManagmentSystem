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

  ngOnInit(): void {
    this.objavaService.getAll().subscribe(data => {
      this.objave = data;
    });

    this.studentNaGodiniId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    console.log('Ulogovani indeks ID:', this.studentNaGodiniId);
  }
}
