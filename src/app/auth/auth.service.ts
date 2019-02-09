import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { IUser, IFakeUser } from './user';
import { AuthData } from './auth-data';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: IFakeUser;
  private user$: Observable<firebase.User>;
  authenticated$: Observable<boolean>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar) {
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
      .catch(error => this.showSnackBar(error.message, null, 5000));
  }

  login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      // console.log('user signined successefully');
      // console.log(result);
      this.router.navigate(['/instructor']);
    })
    .catch(error => this.showSnackBar(error.message, null, 5000));
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(result => {
        // console.log('user signined successefully with Google');
        // console.log(result);
        this.router.navigate(['/instructor']);
      })
      .catch(error => this.showSnackBar(error.message, null, 5000));
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(result => {
        // console.log('user logout successefully');
        this.router.navigate(['/']);
      })
      .catch(error => this.showSnackBar(error.message, null, 5000));
  }

  showSnackBar(message: string, action: string, duration: number) {
    let msg: string;
    // The email address is already in use by another account.
    // The password is invalid or the user does not have a password.
    // There is no user record corresponding to this identifier. The user may have been deleted.
    // The popup has been closed by the user before finalizing the operation.
    if (message === 'The email address is already in use by another account.') {
      msg = 'Указанный Email уже используется другим пользователем.';
    } else if (message === 'The password is invalid or the user does not have a password.') {
      msg = 'Пароль введен не верно.';
    } else if (message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
      msg = 'Пользователь с такими данными не зарегистрирован.';
    } else if (message === 'The popup has been closed by the user before finalizing the operation.') {
      msg = 'Всплывающее окно было закрыто пользователем до завершения входа.';
    } else {
      msg = message;
    }
    this.snackBar.open(msg, action, {duration});
  }
}
