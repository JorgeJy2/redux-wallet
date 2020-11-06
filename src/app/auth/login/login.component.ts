import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { Store } from '@ngrx/store';
import { isLoading, stopLoading } from '../../shared/ui.actions';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private alertService: AlertService,
              private store: Store<AppState>) { }
 
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }


  onSubmit(): void {
    if (this.loginForm.invalid) {
      console.error('Login form invalid');
      return;
    }
    this.store.dispatch(isLoading());
    const login: Login = this.loginForm.value as Login;
    this.auth.login(login)
      .then(credentials => {
        console.log(credentials);
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error(error);
        this.alertService.error(error.message);
      })
      .finally(() => {
        this.store.dispatch(stopLoading());
      });
  }

}
