import { Injectable } from '@angular/core';
import { DepartmanNastavnik } from '../models/DepartmanNastavnik';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
<<<<<<< Updated upstream
import { Observable } from 'rxjs';
=======
import { Observable } from 'rxjs/internal/Observable';
>>>>>>> Stashed changes

@Injectable({
  providedIn: 'root'
})
export class DepartmanNastavnikService extends BaseService<DepartmanNastavnik> {
  apiUrl: any;
  constructor(http: HttpClient) {
    super(http);
<<<<<<< Updated upstream
    this.setUrl('http://localhost:8080/api/departman-nastavnik');
  }

  getByDepartmanId(id: number): Observable<DepartmanNastavnik[]> {
      return this.http.get<DepartmanNastavnik[]>(`http://localhost:8080/api/departman-nastavnik/departman/${id}`);
    }
=======
    this.setUrl('http://localhost:8080/api/DepartmanNastavnik');


    
  }
  
  getByDepartmanId(id: number): Observable<DepartmanNastavnik[]> {
          return this.http.get<DepartmanNastavnik[]>(`http://localhost:8080/api/DepartmanNastavnik/departmani/${id}`);
        }

        deleteByDepartman(departmanId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/departman/${departmanId}`);
        }
>>>>>>> Stashed changes
}