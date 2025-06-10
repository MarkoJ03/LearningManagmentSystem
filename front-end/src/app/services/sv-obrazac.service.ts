import { Injectable } from '@angular/core';
import { SvObrazac } from '../models/SvObrazac';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SvObrazacService extends BaseService<SvObrazac> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/sv-obrazac');
  }

   exportujXML(id: number): Observable<string> {
      return this.http.get(`http://localhost:8080/api/sv-obrazac/${id}/xml`, { responseType: 'text' });
    }
}