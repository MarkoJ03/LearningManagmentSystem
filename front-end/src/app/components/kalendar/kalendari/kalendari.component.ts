import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Kalendar } from '../../../models/Kalendar';
import { KalendarService } from '../../../services/kalendar.service';
import { BaseTableComponent } from '../../base-table/base-table.component';

@Component({
  selector: 'app-kalendari',
  standalone: true,
  imports: [BaseTableComponent,RouterLink],
  templateUrl: './kalendari.component.html',
  styleUrls: ['./kalendari.component.css']
})
export class KalendariComponent implements OnInit {
  kalendari: Kalendar[] = [];
  kolone: string[] = ['id', 'vidljiv', 'studentskaSluzbaId', 'tipEvaluacije', 'grupaStudenata','terminiNastave'];

  constructor(
    private kalendarService: KalendarService,
    private router: Router

    
  ) {}

ngOnInit(): void {
    this.kalendarService.getAll().subscribe({
  next: (res) => {
    this.kalendari = res.map(n => ({
      ...n,
      
    tipEvaluacije: n.evaluacijaZnanja?.map(o => o.tipEvaluacije?.naziv).join(', ') || '',
    terminNastave: n.terminiNastave?.map(o => o.vremePocetka && o.vremeKraja).join(', ')|| '',
    studentskaSluzbaId: n.studentskaSluzba?.id
    }));
  },
  error: (err) => console.error('Greška prilikom učitavanja nastavnika:', err),
});

  }

  izmeni(kalendar: Kalendar): void {
    this.router.navigate(['/kalendari/izmeni', kalendar.id]);
  }

  obrisi(id: number): void {
    this.kalendarService.delete(id).subscribe(() => {
      this.kalendari = this.kalendari.filter(k => k.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/kalendari', id]);
  }

  otkazi(): void {
    this.router.navigate(['/kalendari']);
  }
}
