import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { SilabusTermin } from '../models/SilabusTermin';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SilabusTerminService extends BaseService<SilabusTermin> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/SilabusTermin');
  }
}
