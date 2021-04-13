import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authS: AuthService) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {

        const token = this.authS.getToken();
        if (token) { return true; }

        localStorage.clear();
        await this.router.navigate(['/login'], {queryParams: { returnUrl: state.url } });
        return false;
    }
}
