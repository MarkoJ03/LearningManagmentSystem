// src/app/components/sv-obrasci/sv-obrasci.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SvObrazac } from '../../../models/SvObrazac';
import { SvObrazacService } from '../../../services/sv-obrazac.service';
import { BaseTableComponent } from '../../base-table/base-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sv-obrasci',
  standalone: true,
  imports: [
    BaseTableComponent,
    RouterLink,
    CommonModule
  ],
  templateUrl: './sv-obrasci.component.html',
  styleUrls: ['./sv-obrasci.component.css']
})
export class SvObrasciComponent implements OnInit {
  obrasci: any[] = [];
  kolone: string[] = [
    'maternjiJezik',
    'vrstaZavreseneSrednje',
    'datumZavrsetkaSrednje',
    'bracniStatusDisplay',
    'kontakt',
    'zaposlenDisplay',
    'nacinFinansiranjaDisplay',
    'vidljivDisplay',
    'studentskaSluzbaId',
    'studentNaGodiniNaziv'
  ];

  constructor(private service: SvObrazacService, private router: Router) {}

  
ngOnInit(): void {
  this.service.getAll().subscribe({
    next: (res: SvObrazac[]) => {
      this.obrasci = res.map(obrazac => {
        return {
          ...obrazac,
          
          bracniStatusDisplay: obrazac.bracniStatus ? 'Da' : 'Ne',
          zaposlenDisplay: obrazac.zaposlen ? 'Da' : 'Ne',
          nacinFinansiranjaDisplay: obrazac.nacinFinansiranja ? 'Da' : 'Ne',
          vidljivDisplay: obrazac.vidljiv ? 'Da' : 'Ne',
          studentskaSluzbaId: obrazac.studentskaSluzba ? `${obrazac.studentskaSluzba.id}` : '-',
          studentNaGodiniNaziv: obrazac.studentNaGodini ? obrazac.studentNaGodini.brojIndeksa : '-'
        };
      });
    },
    error: (err) => console.error('Greška prilikom dohvatanja SV obrazaca:', err)
  });
}

  izmeni(o: SvObrazac): void {
    this.router.navigate(['/sv-obrazac/izmeni', o.id]);
  }

  obrisi(id: number): void {
    this.service.delete(id).subscribe(() => {
      this.obrasci = this.obrasci.filter(e => e.id !== id);
    });
  }

  detalji(id: number): void {
    this.router.navigate(['/sv-obrazac', id]);
  }

  otkazi(): void {
    this.router.navigate(['/sv-obrazac']);
  }
}