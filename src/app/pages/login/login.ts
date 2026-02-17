import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
// import * as AuthActions from '../../store/auth/auth.actions';
import * as AuthActions from '../../store/auth/auth.actions';
@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;
  hide = true;
  serverError: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  submitted = false;
  //   login() {
  //   this.submitted = true;
  //   this.serverError = null;

  //   if (this.loginForm.invalid) {
  //     this.loginForm.markAllAsTouched();
  //     this.loginForm.updateValueAndValidity();
  //     return;
  //   }

  //   this.isSubmitting = true;

  //  this.authService.login(this.loginForm.value)
  //   .subscribe({
  //     next: (res) => {
  //       this.isSubmitting = false;
  //       console.log('Login Success', res);
  //       this.router.navigate(['/dashboard']);
  //     },
  //     error: (err) => {
  //       this.isSubmitting = false;

  //       // Backend error message
  //       this.serverError =
  //         err?.error?.errors?.[0] || 'Invalid email or password';
  //     }
  //   });
  // }
  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.store.dispatch(
      AuthActions.login({
        username: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }),
    );
  }
  goToReset() {
    this.router.navigate(['/reset-password']);
  }
}
