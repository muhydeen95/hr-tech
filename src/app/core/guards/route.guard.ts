import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CurrentUserService } from '@core/services/current-user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteGuard implements CanActivate {
  constructor(private current: CurrentUserService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.current.isLoggedIn()) {
      return true;
    }
    this.current.logOut();
    return false;
  }
}
