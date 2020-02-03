import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject, Observable, throwError } from 'rxjs';
import { map, distinctUntilChanged, tap, catchError } from 'rxjs/operators';

/**
 * Authentication Service
 */
@Injectable()
export class AuthService {
  
  /** Backend API used to login. We can use any URL that will enforce an IRIS Basic Auth */
  authApiUrl: string = 'http://localhost:52773/myapp/api/form/info';

  /** isLoginSubject is used to know if the user is logged in or not */
  isLoginSubject = new BehaviorSubject<boolean>(this.authenticated());

  /** private user token */
  private _token: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  /** 
   * Constructor 
   */
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

  /**
   * Login into the app (implements Basic HTTP auth with IRIS backend)
   * @param username 
   * @param password 
   */
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

  /**
   * Logout
   */
  public logout(): void {
    localStorage.removeItem('currentUser');
    setTimeout(() => {
      this.isLoginSubject.next(false);
    });
  }

  /**
   * Returns true if user is authenticated
   */
  public authenticated(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser && currentUser.token;
    if (token) {
      if (this._token) {
        this._token.next(token);
      }
      return true;
    }
    return false;
  }

  /**
   * Returns stored user token (if any)
   */
  getToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser && currentUser.token;
    return token;
  }

  /**
   * Returns an Observable that can be used across the application to know if the user is logged in
   */
  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
  
}

