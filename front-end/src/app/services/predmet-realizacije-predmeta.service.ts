import { Injectable } from '@angular/core';
import { PredmetRealizacijePredmeta } from '../models/PredmetRealizacijePredmeta';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PredmetRealizacijePredmetaService extends BaseService<PredmetRealizacijePredmeta> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/PredmetRealizacijaPredmeta');
  }
}