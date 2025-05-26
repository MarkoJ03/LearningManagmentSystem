import { Injectable } from '@angular/core';
import { Knjiga } from '../models/Knjiga';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class KnjigaService extends BaseService<Knjiga> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/Knjiga');
  }
}