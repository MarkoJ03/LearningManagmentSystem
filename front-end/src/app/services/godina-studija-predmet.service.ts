import { Injectable } from '@angular/core';
import { GodinaStudijaPredmet } from '../models/GodinaStudijaPredmet';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GodinaStudijaPredmetService extends BaseService<GodinaStudijaPredmet> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/GodinaStudijaPredmet');
    
  }
    getByGodinaId(id: number): Observable<GodinaStudijaPredmet[]> {
    return this.http.get<GodinaStudijaPredmet[]>(`http://localhost:8080/api/godina-studija-predmet/godina/${id}`);
  }
}