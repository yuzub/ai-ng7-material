import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Subject } from 'rxjs';
import { IUser, IFakeUser } from './user';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: IFakeUser;
  authChange = new Subject<boolean>();

  private isAuthenticated = false;

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  fakeRegisterUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      uid: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  fakeLogin(authData: AuthData) {
    this.user = {
      email: authData.email,
      uid: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  fakeLogout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/']);
  }

  getUser() {
    return {...this.user};
  }

  fakeIsAuth() {
    return this.user != null;
  }

  registerUser(authData) {
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        // this.authSuccessfully();
      })
      .catch(error => console.log(error));
  }

  login(authData) {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      console.log(result);
      // this.authSuccessfully();
    })
    .catch(error => console.log(error));
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();

    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/instructor']);
  }
}
