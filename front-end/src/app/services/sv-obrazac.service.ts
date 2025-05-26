import { Injectable } from '@angular/core';
import { SvObrazac } from '../models/SvObrazac';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SvObrazacService extends BaseService<SvObrazac> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/SvObrazac');
  }
}