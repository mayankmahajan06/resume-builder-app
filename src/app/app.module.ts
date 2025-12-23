import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, Auth, getAuth } from '@angular/fire/auth';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResumeRendererComponent } from './components/resume-renderer/resume-renderer.component';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { ResumeEditorComponent } from './resume-editor/resume-editor.component';
import { ResumePreviewComponent } from './resume-preview/resume-preview.component';

@NgModule({
  declarations: [				
    AppComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    ResumeRendererComponent,
      SignupComponent,
      AppLayoutComponent,
      ResumeEditorComponent,
      ResumePreviewComponent
   ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDividerModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
