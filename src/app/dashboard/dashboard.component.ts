import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(public auth: AuthService, private router: Router) {}

  // Simulated last resume (Firestore later)
  lastResume: any = null;
  // Example:
  // lastResume = {
  //   name: 'Software Engineer Resume',
  //   updatedAt: new Date()
  // };

  recentResumes = [
    { name: 'Frontend Developer Resume', updatedAt: new Date() },
    { name: 'Angular Resume', updatedAt: new Date(Date.now() - 86400000) }
  ];

  hasResume(): boolean {
    return !!this.lastResume;
  }

  createResume() {
    this.router.navigate(['/editor']);
  }

  continueResume() {
    console.log('Continue Resume');
  }
}
