import { Component, OnInit } from '@angular/core';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { Inventar } from '../../../models/Inventar';
import { InventarService } from '../../../services/inventar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentskaSluzbaService } from '../../../services/studentska-sluzba.service';
import { StudentskaSluzba } from '../../../models/StudentskaSluzba';

@Component({
  selector: 'app-inventar-forma',
  standalone: true,
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './inventar-forma.component.html',
  styleUrls: ['./inventar-forma.component.css']
})
export class InventarFormaComponent implements OnInit {
  formaModel: FormaModel | null = null;
  idInventar: number | null = null;
  sveStudentskeSluzbe: StudentskaSluzba[] = [];

  constructor(
    private inventarService: InventarService,
    private studentskaSluzbaService: StudentskaSluzbaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.studentskaSluzbaService.getAll().subscribe(sluzbe => {
      this.sveStudentskeSluzbe = sluzbe;

      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        this.idInventar = +idParam;
        this.inventarService.getById(this.idInventar).subscribe(inventar => {
          this.formaModel = this.kreirajModel(inventar);
        });
      } else {
        this.formaModel = this.kreirajModel();
      }
    });
  }

  otkazi(): void {
    this.router.navigate(['/inventari']);
  }

  sacuvajInventar(vrednosti: any): void {
    if (this.idInventar) {
      this.inventarService.update(this.idInventar, vrednosti).subscribe({
        next: () => this.router.navigate(['/inventari']),
        error: err => console.error('Greška pri ažuriranju inventara:', err)
      });
    } else {
      this.inventarService.create(vrednosti).subscribe({
        next: () => this.router.navigate(['/inventari']),
        error: err => console.error('Greška pri kreiranju inventara:', err)
      });
    }
  }

  private kreirajModel(podaci?: Inventar): FormaModel {
    return {
      naziv: podaci ? 'Izmena inventara' : 'Dodavanje inventara',
      polja: [
        ...(podaci ? [{
          naziv: 'id',
          labela: '',
          tip: 'hidden',
          podrazumevanaVrednost: podaci.id
        }] : []),
        {
          naziv: 'vidljiv',
          labela: 'Vidljiv',
          tip: 'checkbox',
          podrazumevanaVrednost: podaci?.vidljiv ?? true
        },
        {
          naziv: 'studentskaSluzba',
          labela: 'Studentska služba',
          tip: 'select',
          podrazumevanaVrednost: podaci?.studentskaSluzba ?? null,
          opcije: this.sveStudentskeSluzbe,
          displayFn: (s: StudentskaSluzba) => `${s.id}`,
          validatori: [Validators.required]
        }
      ]
    };
  }

}
