import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fakultet } from '../models/Fakultet';
import { BaseService } from './base.service';


@Injectable({ providedIn: 'root' })
export class FakultetService extends BaseService<Fakultet> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/fakulteti');
  }
}

