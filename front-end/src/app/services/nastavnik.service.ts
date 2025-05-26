import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nastavnik } from '../models/Nastavnik';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class NastavnikService extends BaseService<Nastavnik> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/nastavnik');
  }
}
