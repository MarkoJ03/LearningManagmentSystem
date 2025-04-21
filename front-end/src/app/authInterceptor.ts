import { HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoginService } from "../services/login.service";
import { tap } from "rxjs";
import { Router } from "@angular/router";

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
    let loginService = inject(LoginService);
    let router = inject(Router);
    if (loginService.token) {
        let newReq = req.clone({
            setHeaders: {
                "authorization": loginService.token
            }
        });
        return next(newReq).pipe(tap(r => {
            if (r.type == HttpEventType.Response) {
                console.log(r.status);
            }
        }));
    }

    router.navigateByUrl("/login");
    
    return next(req).pipe(tap(r => {
        if (r.type == HttpEventType.Response) {
            console.log(r.status);
        }
    }));
}