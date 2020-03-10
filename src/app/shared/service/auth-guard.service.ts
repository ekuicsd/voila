import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { CanActivate, Router, ActivatedRouteSnapshot,
  RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private jwtService: JwtService, 
    private router: Router
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.jwtService.getToken()) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}

// export class GuideAuthGuard implements CanActivate {

//   constructor(
//     private jwtService: JwtService, 
//     private router: Router
//     ) { }

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//       if(this.jwtService.getToken()) {
//         return true;
//       } else {
//         this.router.navigateByUrl('/guide/register');
//       }
//     }
// }
