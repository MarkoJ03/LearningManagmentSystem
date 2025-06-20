import { Injectable } from '@angular/core';
import { TipNastave } from '../models/TipNastave';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TipNastaveService extends BaseService<TipNastave> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/tipovi-nastave');
  }
}