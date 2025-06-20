import { Injectable } from '@angular/core';
import { Drzava } from '../models/Drzava';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DrzavaService extends BaseService<Drzava> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/Drzava');
  }
}
