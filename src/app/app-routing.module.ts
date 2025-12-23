import { NgModule, inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { map, take } from 'rxjs/operators';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { ResumeEditorComponent } from './resume-editor/resume-editor.component';

const authGuard = () => {
  const router = inject(Router);
  const auth = inject(Auth);

  return user(auth).pipe(
    take(1),
    map(u => (u ? true : router.createUrlTree(['/login'])))
  );
};

const routes: Routes = [
  /* ---------- PUBLIC ---------- */
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  /* ---------- PROTECTED LAYOUT ---------- */
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'editor', component: ResumeEditorComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  /* ---------- FALLBACK ---------- */
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
