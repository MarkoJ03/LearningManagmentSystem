import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NaucnaOblast } from '../../../../models/NaucnaOblast';
import { NaucnaOblastService } from '../../../../services/naucna-oblast.service';
import { Zvanje } from '../../../../models/Zvanje';

@Component({
  selector: 'app-naucna-oblast',
  imports: [CommonModule, RouterLink],
  templateUrl: './naucna-oblast.component.html',
  styleUrl: './naucna-oblast.component.css'
})
export class NaucnaOblastComponent {
  naucnaOblast: NaucnaOblast | null = null;
  zvanja: Zvanje[] = [];

  constructor(
    private route: ActivatedRoute,
    private naucnaOblastService: NaucnaOblastService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.naucnaOblastService.getById(id).subscribe(n => {
        this.naucnaOblast = n;
        console.log('Naucna Oblast:', n);
      });
    });
  }
}
