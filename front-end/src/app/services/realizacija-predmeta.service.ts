import { Injectable } from '@angular/core';
import { RealizacijaPredmeta } from '../models/RealizacijaPredmeta';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RealizacijaPredmetaService extends BaseService<RealizacijaPredmeta> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/RealizacijaPredmeta');
  }
}