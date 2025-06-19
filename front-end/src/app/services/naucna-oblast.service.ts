import { Injectable } from '@angular/core';
import { NaucnaOblast } from '../models/NaucnaOblast';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class NaucnaOblastService extends BaseService<NaucnaOblast> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/naucne-oblasti');
  }
}