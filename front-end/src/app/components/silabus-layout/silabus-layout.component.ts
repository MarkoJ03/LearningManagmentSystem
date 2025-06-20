import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PredmetService } from '../../services/predmet.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SilabusService } from '../../services/silabus.service';

@Component({
  selector: 'app-silabus-layout',
  imports: [CommonModule],
  templateUrl: './silabus-layout.component.html',
  styleUrl: './silabus-layout.component.css'
})
export class SilabusLayoutComponent implements OnInit {
  termini: any[] = [];
  predmetId: number = 0;
  predmet: any;

  constructor(
    private route: ActivatedRoute,
    private predmetService: PredmetService,
    private silabusService: SilabusService
  ) {}

  ngOnInit(): void {
    this.predmetId = Number(this.route.snapshot.paramMap.get('id'));
    this.predmetService.getById(this.predmetId).subscribe({
      next: (predmet) => {
        this.predmet=predmet;
        this.termini = predmet?.dokumentiPredmeta?.silabus?.termini ?? [];
      },
      error: (err) => console.error('Greška:', err)
    });
  }

  exportujXml() {

      this.silabusService.exportujXML(this.predmet.dokumentiPredmeta.silabus.id).subscribe({
      next: (xmlContent) => {
        const blob = new Blob([xmlContent], { type: 'application/xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `silabus_${this.predmet.naziv.replace(/\s+/g, '_')}.xml`;    
        link.click();
      },
      error: (err) => console.error('Greška prilikom izvoza XML-a:', err)
    });
  }
}
