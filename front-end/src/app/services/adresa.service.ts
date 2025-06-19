import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Adresa } from '../models/Adresa';

@Injectable({
  providedIn: 'root'
})
export class AdresaService extends BaseService<Adresa> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/adrese');
  }
}