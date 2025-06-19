import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { PravoPristupa } from '../models/PravoPristupa';

@Injectable({
  providedIn: 'root'
})
export class PravoPristupaService extends BaseService<PravoPristupa>{
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/prava-pristupa');
  }
}
