import { Injectable } from '@angular/core';
import { StudentskaSluzba } from '../models/StudentskaSluzba';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class StudentskaSluzbaService extends BaseService<StudentskaSluzba> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/studentske-sluzbe');
  }
}