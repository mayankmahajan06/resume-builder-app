import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User
} from '@angular/fire/auth';
import { authState } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // 🔁 Reactive auth state (login / logout / refresh)
  user$: Observable<User | null>;

  constructor(private auth: Auth) {
    // Emits user when logged in, null when logged out
    this.user$ = authState(this.auth);
  }

  // 🔐 LOGIN
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // 🆕 SIGN UP
  signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // 🔁 FORGOT PASSWORD
  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  // 🚪 LOGOUT
  logout() {
    return signOut(this.auth);
  }

  // ⚠️ Use only for quick sync checks (NOT UI)
  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }
}
