import { Injectable } from '@angular/core';
import { GrupaStudenataPredmet } from '../models/GrupaStudenataPredmet';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupaStudenataPredmetService extends BaseService<GrupaStudenataPredmet> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/grupa-studenata-predmet');
  }

  getByGrupaStudenataId(id: number): Observable<GrupaStudenataPredmet[]> {
    return this.http.get<GrupaStudenataPredmet[]>(`http://localhost:8080/api/grupa-studenata-predmet/predmet/${id}`);
  }
}