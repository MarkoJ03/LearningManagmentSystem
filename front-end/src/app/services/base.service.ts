import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export class BaseService<T> {
  
  private baseUrl: string = '';

  constructor(protected  http: HttpClient) {}

  setUrl(url: string) {
    this.baseUrl = url;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, entity);
  }

  update(id: number, entity: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, entity);
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${id}`);
  }
}
