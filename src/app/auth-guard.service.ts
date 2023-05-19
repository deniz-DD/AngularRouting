import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Route, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs-compat";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable()

export class AuthGuard implements CanActivate , CanActivateChild{

    constructor(private authService: AuthService , private router: Router){}

    canActivate(route: ActivatedRouteSnapshot , state: RouterStateSnapshot): Observable<boolean>| Promise<boolean>| boolean {
        return this.authService.isAuth().then(
             (auth: boolean) => {
                if(auth){
                    return true ;
                }else{
                    this.router.navigate(['/']);
                }
             }

        );

    }


    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute , state);
    }
}