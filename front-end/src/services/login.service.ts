import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token: any = null;

  constructor(private http: HttpClient) {
    let t = localStorage.getItem("token");
    if (t) {
      this.token = t;
    }
  }


  login(user: any) {
    return this.http.post("http://localhost:8080/api/auth/login", user, { responseType: 'text' }).pipe(
      tap(x => {
        this.token = x;
        localStorage.setItem("token", this.token);
      })
    );
  }

  getUser() {
    if (this.token) {
      let payload = this.token.split(".")[1];
      return JSON.parse(atob(payload));
    }
  }

  getRoles() {
    let user = this.getUser();
    if (user) {
      return user.authorities.map((a: any) => a.authority);
    }
  }

  validateRoles(requiredRoles: any) {
    let requiredRolesSet: any = new Set(requiredRoles);
    let userRolesSet: any = new Set(this.getRoles());
    let r = requiredRolesSet.intersection(userRolesSet);
    if (r.size > 0) {
      return true;
    }
    return false;
  }

  getUserByEmail(email: string) {
    return this.http.get<any>(`http://localhost:8080/api/korisnici/email/${email}`);
  }
}
