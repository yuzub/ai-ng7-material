import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup.component';
import { LoginComponent } from './login.component';

// import { RequireUnauthGuard } from "./guards/require-unauth.guard";

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    // canActivate: [RequireUnauthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [RequireUnauthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
