import { Injectable } from '@angular/core';
import { StudijskiProgram } from '../models/StudijskiProgram';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class StudijskiProgramService extends BaseService<StudijskiProgram> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/studijski-program');
  }
}