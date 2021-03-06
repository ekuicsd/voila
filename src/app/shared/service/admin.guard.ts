import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminHomeGuardService implements CanActivate {

  constructor(
    private userService: UserService, 
    private router: Router
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.userService.getRole() !== 'admin') {
        return true;
    } else {
        this.router.navigateByUrl('/admin/dashboard');
        return false;
    }
  }
}