import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthService} from '../modules/auth/services/auth.service';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    authServ: AuthService
    constructor(authService: AuthService) {
      this.authServ = authService;
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {
            if(err.status === 0) {
              return throwError('Ha ocurrido un error al comunicar con el servidor');
            }

            if (err.status === 401) {
              if (this.authServ.getToken()) {
                this.authServ.removeToken();
                localStorage.clear();
                location.reload();
              }
            }

          if (err.error && err.error.errors) {
            const errObj = err.error.errors;
            console.log(errObj);
            const text = errObj.join(",");
            return throwError(text);
          }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
