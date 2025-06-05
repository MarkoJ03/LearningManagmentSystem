import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/Student';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseService<Student> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/studenti');
  }
}