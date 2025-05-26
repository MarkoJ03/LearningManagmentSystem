import { Injectable } from '@angular/core';
import { Departman } from '../models/Departaman';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmanService extends BaseService<Departman> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/Departman');
  }
}
