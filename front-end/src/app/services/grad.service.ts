import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Grad } from '../models/Grad';
import { HttpClient } from '@angular/common/http';

@Injectable({
   providedIn: 'root'
})
export class gradService extends BaseService<Grad> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/Grad');
  }
}
