import { Injectable } from '@angular/core';
import { Predmet } from '../models/Predmet';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PredmetService extends BaseService<Predmet> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/Predmet');
  }
}