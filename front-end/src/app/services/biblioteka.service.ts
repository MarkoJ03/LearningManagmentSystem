import { Injectable } from '@angular/core';
import { Biblioteka } from '../models/Biblioteka';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BibliotekaService extends BaseService<Biblioteka> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/Biblioteka');
  }
}