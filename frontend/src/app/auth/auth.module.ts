import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule,
  ] 
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
      return {
          ngModule: AuthModule,
          providers: [
            AuthService,
            AuthGuard,
            {
              provide: HTTP_INTERCEPTORS,
              useClass: AuthInterceptor,
              multi: true,
            }
          ]
      }
  }
}
