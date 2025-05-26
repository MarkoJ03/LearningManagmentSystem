import { Injectable } from '@angular/core';
import { Kalendar } from '../models/Kalendar';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class KalendarService extends BaseService<Kalendar> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/Kalendar');
  }
}