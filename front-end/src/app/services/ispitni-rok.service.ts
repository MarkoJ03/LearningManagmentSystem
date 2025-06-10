import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { IspitniRok } from '../models/IspitniRok';

@Injectable({
  providedIn: 'root'
})
export class IspitniRokService extends BaseService<IspitniRok> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/IspitniRok');
  }
}