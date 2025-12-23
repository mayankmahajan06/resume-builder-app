import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading = false;
  showPassword = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async onSubmit() {
    if (this.loginForm.invalid || this.loading) return;

    try {
      this.loading = true;
      await this.auth.login(
        this.loginForm.value.email!,
        this.loginForm.value.password!
      );
      this.router.navigate(['/dashboard']);
    } catch {
      this.snackBar.open('Login failed. Please try again.', 'OK', {
        duration: 4000,
      });
    } finally {
      this.loading = false;
    }
  }

  async onForgot() {
    const email = this.loginForm.get('email')?.value;
    if (!email) {
      this.snackBar.open('Enter your email to reset password.', 'OK', {
        duration: 4000,
      });
      return;
    }

    await this.auth.resetPassword(email);
    this.snackBar.open('Reset email sent.', 'OK', { duration: 4000 });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
