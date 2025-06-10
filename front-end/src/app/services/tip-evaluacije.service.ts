import { Injectable } from '@angular/core';
import { TipEvaluacije } from '../models/TipEvaluacije';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TipEvaluacijeService extends BaseService<TipEvaluacije> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/tipovi-evaluacije');
  }
}