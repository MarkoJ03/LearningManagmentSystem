import { Injectable } from '@angular/core';
import { IshodEvaluacije } from '../models/IshodEvaluacije';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class IshodEvaluacijeService extends BaseService<IshodEvaluacije> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/ishodi-evaluacije');
  }
}