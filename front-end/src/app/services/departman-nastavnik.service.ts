import { Injectable } from '@angular/core';
import { DepartmanNastavnik } from '../models/DepartmanNastavnik';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DepartmanNastavnikService extends BaseService<DepartmanNastavnik> {
  apiUrl: any;
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/departman-nastavnik');
  }

  getByDepartmanId(id: number): Observable<DepartmanNastavnik[]> {
      return this.http.get<DepartmanNastavnik[]>(`http://localhost:8080/api/departman-nastavnik/departman/${id}`);
    }
}