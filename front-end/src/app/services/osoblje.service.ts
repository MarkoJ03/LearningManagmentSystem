import { Injectable } from '@angular/core';
import { Osoblje } from '../models/Osoblje';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OsobljeService extends BaseService<Osoblje> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/osoblje');
  }
}