import { Injectable } from '@angular/core';
import { GrupaStudenataPredmet } from '../models/GrupaStudenataPredmet';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class GrupaStudenataPredmetService extends BaseService<GrupaStudenataPredmet> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/GrupaStudenataPredmet');
  }
}