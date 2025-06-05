import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SvObrazac } from '../../../models/SvObrazac';
import { SvObrazacService } from '../../../services/sv-obrazac.service';

@Component({
  selector: 'app-sv-obrazac',
  templateUrl: './sv-obrazac.component.html',
  styleUrls: ['./sv-obrazac.component.css']
})
export class SvObrazacComponent implements OnInit {
  obrazac: SvObrazac | null = null;

  constructor(
    private route: ActivatedRoute,
    private svObrazacService: SvObrazacService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.svObrazacService.getById(id).subscribe(data => {
      this.obrazac = data;
      console.log('Obrazac:', data);
    });
  }
}
