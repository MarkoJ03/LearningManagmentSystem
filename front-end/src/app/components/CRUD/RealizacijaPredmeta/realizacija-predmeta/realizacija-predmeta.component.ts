import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TerminNastave } from '../../../../models/TerminNastave';
import { RealizacijaPredmeta } from '../../../../models/RealizacijaPredmeta';
import { RealizacijaPredmetaService } from '../../../../services/realizacija-predmeta.service';

@Component({
  selector: 'app-realizacija-predmeta',
  imports: [CommonModule, RouterLink],
  templateUrl: './realizacija-predmeta.component.html',
  styleUrl: './realizacija-predmeta.component.css'
})
export class RealizacijaPredmetaComponent {
  realizacijaPredmeta: RealizacijaPredmeta | null = null;
  terminiNastave: TerminNastave[] = [];

  constructor(
    private route: ActivatedRoute,
    private realizacijaPredmetaService: RealizacijaPredmetaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.realizacijaPredmetaService.getById(id).subscribe(r => {
        this.realizacijaPredmeta = r;
        console.log('Realizacija Predmeta:', r);
      });
    });
  }
}
