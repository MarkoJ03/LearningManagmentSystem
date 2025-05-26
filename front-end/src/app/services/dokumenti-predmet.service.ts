import { Injectable } from '@angular/core';
import { DokumentiPredmeta } from '../models/DokumentiPredmeta';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DokumentiPredmetService extends BaseService<DokumentiPredmeta> {
  constructor(http: HttpClient) {
    super(http);
    this.setUrl('http://localhost:8080/api/DokumentPredmeta');
  }
}
