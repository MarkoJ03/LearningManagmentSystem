import { Injectable } from '@angular/core';
import { GrupaStudenata } from '../models/GrupaStudenata';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class GrupaStudenataService extends BaseService<GrupaStudenata> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/GrupaStudenata');
  }
}