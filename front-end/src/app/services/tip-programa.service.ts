import { Injectable } from '@angular/core';
import { TipPrograma } from '../models/TipPrograma';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TipProgramaService extends BaseService<TipPrograma> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/tipovi-programa');
  }
}