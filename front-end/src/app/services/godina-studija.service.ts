import { Injectable } from '@angular/core';
import { GodinaStudija } from '../models/GodinaStudija';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class GodinaStudijaService extends BaseService<GodinaStudija> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/GodinaStudija');
  }
}