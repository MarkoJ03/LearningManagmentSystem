import { Injectable } from '@angular/core';
import { Katedra } from '../models/Katedra';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class KatedraService extends BaseService<Katedra> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/Katedra');
  }
}