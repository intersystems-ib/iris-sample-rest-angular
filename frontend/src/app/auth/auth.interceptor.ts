import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authService: AuthService) {}

  setHeaders(req: HttpRequest<any>) {
    if (!req.headers.has('Authorization')) {        
      req = req.clone({
        setHeaders: { Authorization: this.authService.getToken() },
      });
    }
    return req;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.setHeaders(req));
  }
}