import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Injectable()
export class RequireUnauthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    // console.log('require-unauth guard starts');
    return this.authService.authenticated$
      .pipe(take(1))
      .pipe(tap(authenticated => {
        if (authenticated) {
          this.router.navigate(['/instructor']);
        }
      }))
      .pipe(map(authenticated => !authenticated));
  }
}
