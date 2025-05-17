import { Injectable } from '@angular/core';
import { DepartmanNastavnik } from '../models/DepartmanNastavnik';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmanNastavnikService extends BaseService<DepartmanNastavnik> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/DepartmanNastavnik');
  }
}