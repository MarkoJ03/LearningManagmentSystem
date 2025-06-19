import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { DodeljenoPravoPristupa } from '../models/DodeljenoPravoPristupa';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DodeljenoPravoPristupaService extends BaseService<DodeljenoPravoPristupa> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/dodeljena-prava-pristupa');
  }

  getByKorisnikId(id: number): Observable<DodeljenoPravoPristupa[]> {
    return this.http.get<DodeljenoPravoPristupa[]>(`http://localhost:8080/api/dodeljena-prava-pristupa/korisnik/${id}`);
  }
}
