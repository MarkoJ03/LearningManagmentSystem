import { Injectable } from '@angular/core';
import { Objava } from '../models/Objava';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ObjavaService extends BaseService<Objava> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/Objava');
  }
}