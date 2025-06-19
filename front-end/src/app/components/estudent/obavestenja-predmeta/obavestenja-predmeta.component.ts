import { Component, OnInit } from '@angular/core';
import { Predmet } from '../../../models/Predmet';
import { ActivatedRoute } from '@angular/router';
import { GodinaStudijaPredmetService } from '../../../services/godina-studija-predmet.service';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';
import { PredmetService } from '../../../services/predmet.service';
import { Obavestenje } from '../../../models/Obavestenje';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-obavestenja-predmeta',
  imports: [CommonModule],
  templateUrl: './obavestenja-predmeta.component.html',
  styleUrl: './obavestenja-predmeta.component.css'
})
export class ObavestenjaPredmetaComponent implements OnInit {
  predmetId!: number;
  predmet!: Predmet;
  obavestenja?: Obavestenje[] = [];

  constructor(
    private route: ActivatedRoute,
    private predmetService: PredmetService
    
  ) {}



  ngOnInit(): void {
  const predmetId = Number(this.route.snapshot.paramMap.get('id'));
  this.predmetService.getById(predmetId).subscribe(predmet => {
    this.predmet=predmet;
    this.obavestenja= predmet.obavestenja;
  });
  }

}
