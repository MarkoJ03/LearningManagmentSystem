import { Injectable } from '@angular/core';
import { Univerzitet } from '../models/Univerzitet';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UniverzitetService extends BaseService<Univerzitet> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/univerziteti');
  }
}