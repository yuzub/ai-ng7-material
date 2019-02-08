import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { RequireAuthGuard } from './guards/require-auth.guard';
import { RequireUnauthGuard } from './guards/require-unauth.guard';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule
  ],
  providers: [
    RequireAuthGuard,
    RequireUnauthGuard
  ]
})
export class AuthModule { }
