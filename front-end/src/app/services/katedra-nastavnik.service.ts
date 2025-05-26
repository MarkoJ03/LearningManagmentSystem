import { Injectable } from '@angular/core';
import { KatedraNastavnik } from '../models/KatedraNastavnik';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class KatedraNastavnikService extends BaseService<KatedraNastavnik> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/KatedraNastavnik');
  }
}