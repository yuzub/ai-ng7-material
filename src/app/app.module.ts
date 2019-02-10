import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { InstructorModule } from './instructor/instructor.module';
import { FeedbackModule } from './feedback/feedback.module';

import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { InstructorService } from './instructor/instructor.service';
import { FeedbackService } from './feedback/feedback.service';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LinksComponent } from './links/links.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { UIService } from './shared/ui.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    LinksComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports
    // AngularFireFunctionsModule, // imports
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    // AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    // AngularFireStorageModule, // imports firebase/storage only needed for storage features
    // AngularFireMessagingModule, // imports
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule,
    InstructorModule,
    FeedbackModule,
    AppRoutingModule,
  ],
  providers: [
    AuthService, InstructorService, FeedbackService, UIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
