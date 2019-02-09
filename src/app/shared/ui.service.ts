import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UIService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(message: string, action: string, duration: number) {
    let msg: string;
    // List of errors - in signup and login
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
