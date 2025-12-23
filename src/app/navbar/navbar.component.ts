import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  async onLogout() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }

  getUserName(user: any): string {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  }
}
