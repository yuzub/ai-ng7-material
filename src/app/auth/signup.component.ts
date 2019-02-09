import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UIService } from '../shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
    this.isLoading$ = this.uiService.loadingStateChanged;
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  loginGoogle() {
    this.authService.loginGoogle();
  }
}
