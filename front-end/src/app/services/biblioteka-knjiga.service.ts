import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BibliotekaKnjiga } from '../models/BibliotekaKnjiga';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BibliotekaKnjigaService extends BaseService<BibliotekaKnjiga> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/BibliotekaKnjiga');

  }

      getByBibliotekaId(id: number): Observable<BibliotekaKnjiga[]> {
      return this.http.get<BibliotekaKnjiga[]>(`http://localhost:8080/api/BibliotekaKnjiga/biblioteka/${id}`);
    }

}