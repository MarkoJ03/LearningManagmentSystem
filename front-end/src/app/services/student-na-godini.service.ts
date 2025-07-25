import { Injectable } from '@angular/core';
import { StudentNaGodini } from '../models/StudentNaGodini';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class StudentNaGodiniService extends BaseService<StudentNaGodini> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/studenti-na-godini');
  }

  getByPredmetId(predmetId: number) {
    return this.http.get<StudentNaGodini[]>(`http://localhost:8080/api/studenti-na-godini/${predmetId}/studenti-na-godini`);
  }
}