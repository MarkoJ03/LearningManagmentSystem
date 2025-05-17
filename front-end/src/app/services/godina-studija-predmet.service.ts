import { Injectable } from '@angular/core';
import { GodinaStudijaPredmet } from '../models/GodinaStudijaPredmet';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class GodinaStudijaPredmetService extends BaseService<GodinaStudijaPredmet> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/GodinaStudijaPredmet');
  }
}