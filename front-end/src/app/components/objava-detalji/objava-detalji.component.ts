import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ObjavaService } from '../../services/objava.service';


@Component({
  selector: 'app-objava-detalji',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './objava-detalji.component.html',
  styleUrls: ['./objava-detalji.component.css']
})
export class ObjavaDetaljiComponent implements OnInit {
  objava: any;
  id!: number;

  constructor(private route: ActivatedRoute, private objavaService: ObjavaService) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.objavaService.getById(this.id).subscribe(data => {
      this.objava = data;
    });
  }
}
