import { Injectable } from '@angular/core';
import { Obavestenje } from '../models/Obavestenje';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ObavestenjeService extends BaseService<Obavestenje> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/Obavestenje');
  }
}
