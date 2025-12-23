import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { updateProfile } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  loading = false;

  signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async onSignup() {
    if (this.signupForm.invalid || this.loading) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.signupForm.value;

    try {
      this.loading = true;

      const cred = await this.auth.signup(email!, password!);
      await updateProfile(cred.user, { displayName: name! });

      // ✅ Success message
      this.snackBar.open('Account created successfully 🎉', 'OK', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });

      this.router.navigate(['/dashboard']);

    } catch (e: any) {
      // ❌ Error message
      this.snackBar.open(
        this.humanizeFirebaseError(e?.code),
        'Close',
        {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }
      );
    } finally {
      this.loading = false;
    }
  }

  private humanizeFirebaseError(code?: string) {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Email already registered.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters.';
      default:
        return 'Signup failed. Please try again.';
    }
  }
}
