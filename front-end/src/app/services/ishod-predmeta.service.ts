import { Injectable } from '@angular/core';
import { IshodPredmeta } from '../models/IshodPredmeta';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class IshodPredmetaService extends BaseService<IshodPredmeta> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/ishod-predmeta');
  }
}