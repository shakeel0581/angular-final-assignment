import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const checkTOken = this.authService.isLoggedIn();
    if (!checkTOken) {
      window.alert('Access not allowed!');
      this.router.navigate(['log-in']);
    }
    return true;
  }
}
