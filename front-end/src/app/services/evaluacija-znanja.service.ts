import { Injectable } from '@angular/core';
import { EvaluacijaZnanja } from '../models/EvaluacijaZnanja';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluacijaZnanjaService extends BaseService<EvaluacijaZnanja> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/evaluacije-znanja');
  }
}