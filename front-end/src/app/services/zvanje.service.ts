import { Injectable } from '@angular/core';
import { Zvanje } from '../models/Zvanje';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ZvanjeService extends BaseService<Zvanje> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/zvanja');
  }
}