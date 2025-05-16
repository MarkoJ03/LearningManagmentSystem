import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicService {
  private baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getAll<T>(endpoint:string): Observable<T[]>{
    return this.http.get<T[]>(`${this.baseUrl}/${endpoint}`);
  }

  getById<T>(endpoint:string, id:number): Observable<T>{
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id}`);
  }

  create<T>(endpoint:string, data:T): Observable<T>{
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data);
  }

  update<T>(endpoint:string,id:number, data:T): Observable<T>{
    return this.http.put<T>(`${this.baseUrl}/${endpoint}/${id}`, data);
  }

  delete(endpoint: string, id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${endpoint}/${id}`);
  }
}
