import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import { TokenService } from './token.service';
import { AuthStateService } from './auth-state.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private token: TokenService,
    private router: Router,
    private authenticationService: AuthStateService
  ) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot):
              Observable<boolean | UrlTree> {

    return this.authenticationService.userAuthState
      .pipe(
        map(userAuthState => userAuthState ? true : this.router.parseUrl('login')));

    // not logged in so redirect to login page with the return url
    /*this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;*/
  }

}
