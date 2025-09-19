import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const isAuth = await this.authService.isAuthenticated();
    if (isAuth) {
      return this.router.createUrlTree(['/home']);
    } else {
      return true;
    }
  }
}
