import { Injectable } from '@angular/core';
import { Korisnik } from '../models/Korisnik';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService extends BaseService<Korisnik> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/korisnici');
  }
}