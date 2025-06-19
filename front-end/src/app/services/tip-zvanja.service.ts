import { Injectable } from '@angular/core';
import { TipZvanja } from '../models/TipZvanja';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TipZvanjaService extends BaseService<TipZvanja> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/tipovi-zvanja');
  }
}