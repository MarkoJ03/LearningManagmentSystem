import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BibliotekaKnjiga } from '../models/BibliotekaKnjiga';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BibliotekaKnjigaService extends BaseService<BibliotekaKnjiga> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/BibliotekaKnjiga');
  }
}