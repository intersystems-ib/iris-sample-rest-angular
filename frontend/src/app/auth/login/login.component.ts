import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
  ) { }

  ngOnInit() {
    const formControls = {
      username: ['', Validators.required],
      password: ['', Validators.required]
    };
    this.form = this.fb.group(formControls);
  }

  onLogin() {
    let data = { ...this.form.value }
    const username = data.username;
    const password = data.password;
    
    this.loading = true;
    this.authService.login(username, password).subscribe(
      data => { 
        this.loading = false; 
      },
      error => {
        this.loading = false;
        console.log('TODO: error on login');
      }
    );
    
  }

}
