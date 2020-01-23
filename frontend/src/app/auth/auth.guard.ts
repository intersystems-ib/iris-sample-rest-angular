import { Injectable } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Router, Route, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _platformLocation: PlatformLocation, private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): boolean | Observable<boolean> {
    if (this.authService.authenticated()) {
      return true;
    }

    let queryParams = this.router.parseUrl(this._platformLocation.search).queryParams;
    this.router.navigate(['/auth/login'], { queryParams });
    return false;
  }
  
}