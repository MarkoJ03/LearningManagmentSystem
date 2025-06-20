import { Injectable } from '@angular/core';
import { Inventar } from '../models/Inventar';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class InventarService extends BaseService<Inventar> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/inventari');
  }
}