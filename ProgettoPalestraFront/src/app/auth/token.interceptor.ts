import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authSrv: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("prova1");
    return this.authSrv.user$.pipe(
      take(1),
      switchMap((token) => {
        if (token) {
          console.log("prova");
          const newReq = request.clone({
            headers: request.headers.append('Authorization',"Bearer " + token)
          });
          return next.handle(newReq);
        } else {
          console.log("No user token found, proceeding without Authorization header.");
          return next.handle(request);
        }
      })
    );
  }
}
