import { Injectable } from '@angular/core';
import { TerminNastave } from '../models/TerminNastave';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TerminNastaveService extends BaseService<TerminNastave> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/termini-nastave');
  }
}