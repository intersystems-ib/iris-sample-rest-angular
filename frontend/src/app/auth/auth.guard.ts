import { Injectable } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Router, Route, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  /**
   * Constructor
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Returns true if a authentication-protected URL can be activated
   * This method will be called by every URL that is authentication-protected in the application
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.checkLogin(state.url);
  }

  /**
   * Returns true if user authenticated, otherwise it will redirect the user to login page
   * @param url 
   */
  checkLogin(url: string): boolean | Observable<boolean> {
    if (this.authService.authenticated()) {
      return true;
    }

    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: url }});
    return false;
  }
  
}