import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject, Observable, throwError } from 'rxjs';
import { map, distinctUntilChanged, tap, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
client_id = 'client';
  client_secret = 'secret';
  authApiUrl: string = 'http://localhost:52773/myapp/api/form/info';
  isLoginSubject = new BehaviorSubject<boolean>(this.authenticated());

  private _token: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient, private router: Router) {
    document.execCommand('ClearAuthenticationCache', false);

    this._token
      .asObservable()
      .subscribe(
        token => {
          // user token changed. 
          // you can grab user data from server (e.g. preferences) 
        }
      );
  }

  public login(username: string, password: string): Observable<string> {
    let basicheader = btoa(encodeURI(username+":"+password));
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + basicheader);
    headers = headers.set('Cache-Control', 'no-cache');

    return this.http
      .get<any>(this.authApiUrl, {
        headers
      }).
      pipe(
        map(data => { 
          let token = `Basic ${basicheader}`;
          localStorage.setItem('currentUser', JSON.stringify({ username, token }));
          this._token.next(token);
          setTimeout(() => {
            this.isLoginSubject.next(true);
          });
          return username;
        }),
        catchError(err => {
          this.logout();
          return throwError(err);
        })
      );
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    setTimeout(() => {
      this.isLoginSubject.next(false);
    });
    //this.router.navigate(['/shows/latest']);
  }

  public authenticated(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser && currentUser.token;
    if (this._token && token) {
      this._token.next(token);
      return true;
    }
    return false;
  }

  getToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser && currentUser.token;
    return token;
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
  
}

