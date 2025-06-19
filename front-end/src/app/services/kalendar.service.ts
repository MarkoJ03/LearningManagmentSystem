import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kalendar } from '../models/Kalendar';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class KalendarService extends BaseService<Kalendar> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/kalendari');
  }

  getByNastavnikId(nastavnikId: number): Observable<Kalendar> {
    return this.http.get<Kalendar>(`http://localhost:8080/api/kalendari/nastavnik/${nastavnikId}`);
  }
}
