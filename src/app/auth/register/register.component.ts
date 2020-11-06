import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/services/alert.service';
import { RegisterUser } from '../../models/registerUser.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,
             private router: Router, private spinner: NgxSpinnerService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(5), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],

    });
  }

  onSubmit(): void {
    if (this.formRegister.invalid) {
      console.error('Form register no valid,');
      return;
    }
    this.spinner.show();

    const userRegister: RegisterUser = this.formRegister.value as RegisterUser;
    this.authService.registerUser(userRegister)
      .then(credentials => {
        this.router.navigate(['/']);
      }) .catch(error => {
        console.error(error);
        this.alertService.error(error.message);
      })
      .finally(() => {
        this.spinner.hide();
      });
  }

}
