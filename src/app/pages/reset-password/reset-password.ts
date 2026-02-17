import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss'
})
export class ResetPassword {

  resetForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router ,
    private authService: AuthService
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  serverMessage: string | null = null;
  isSubmitting = false;

 submit() {
  this.serverMessage = null;

  if (this.resetForm.invalid) {
    this.resetForm.markAllAsTouched();
    return;
  }

  this.isSubmitting = true;

  const email = this.resetForm.value.email;

  this.authService.forgotPassword(email)
    .subscribe({
      next: (res) => {
        this.isSubmitting = false;

        this.serverMessage =
          'Reset link has been sent to your email.';

         setTimeout(() => {
          this.resetForm.reset();
        });
      },
      error: (err) => {
        this.isSubmitting = false;
        this.serverMessage =
          err?.error?.errors?.[0] || 'Something went wrong.';
      }
    });
}

  backToLogin() {
    this.router.navigate(['/login']);
  }
}