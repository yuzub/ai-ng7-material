import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { IUser, IFakeUser } from './user';
import { AuthData } from './auth-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: IFakeUser;
  private user$: Observable<firebase.User>;
  authenticated$: Observable<boolean>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user$ = afAuth.user;
    this.authenticated$ = afAuth.user.pipe(map(user => !!user));
  }

  getAfUser(): Observable<firebase.User> {
    return this.user$;
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // console.log('user created successefully');
        // console.log(result);
        this.router.navigate(['/instructor']);
      })
      .catch(error => console.log(error));
  }

  login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      // console.log('user signined successefully');
      // console.log(result);
      this.router.navigate(['/instructor']);
    })
    .catch(error => console.log(error));
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(result => {
        // console.log('user signined successefully with Google');
        // console.log(result);
        this.router.navigate(['/instructor']);
      })
      .catch(error => console.log(error));
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(result => {
        // console.log('user logout successefully');
        this.router.navigate(['/']);
      })
      .catch(error => console.log(error));
  }
}
