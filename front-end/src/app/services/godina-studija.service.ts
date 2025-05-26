import { Injectable } from '@angular/core';
import { GodinaStudija } from '../models/GodinaStudija';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GodinaStudijaService extends BaseService<GodinaStudija> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/GodinaStudija');
  }

  getByProgramId(id: number): Observable<GodinaStudija[]> {
  return this.http.get<GodinaStudija[]>(`http://localhost:8080/api/GodinaStudija/program/${id}`);
}
}