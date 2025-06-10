import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Silabus } from '../models/Silabus';

@Injectable({
  providedIn: 'root'
})
export class SilabusService extends BaseService<Silabus> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/Silabus');
  }
 exportujXML(id: number): Observable<string> {
    return this.http.get(`http://localhost:8080/api/Silabus/${id}/xml`, { responseType: 'text' });
  }
}
