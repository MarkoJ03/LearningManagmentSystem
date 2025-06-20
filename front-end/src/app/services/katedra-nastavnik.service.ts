import { Injectable } from '@angular/core';
import { KatedraNastavnik } from '../models/KatedraNastavnik';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KatedraNastavnikService extends BaseService<KatedraNastavnik> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/katedra-nastavnik');
  }

  getByKatedraId(id: number): Observable<KatedraNastavnik[]> {
    return this.http.get<KatedraNastavnik[]>(`http://localhost:8080/api/katedra-nastavnik/katedra/${id}`);
  }
}