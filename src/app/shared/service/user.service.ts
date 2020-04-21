import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { Router } from "@angular/router";


import { JwtService } from './jwt.service';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
    
    constructor(private apiService: ApiService,
        private jwtService: JwtService,
        private router: Router,
    ) {}


    // populate() {
    //     // If JWT detected, attempt to get & store user's info
    //     if (this.jwtService.getToken()) {
    //         this.apiService.get('/user')
    //         .subscribe(
    //             data => this.setAuth(data.user),
    //             err => this.purgeAuth()
    //         );
    //     } else {
    //         // Remove any potential remnants of previous auth states
    //         this.purgeAuth();
    //     }
    // }
        
    setAuth(token) {
        this.jwtService.setToken(token);
        this.isAuthenticatedSubject.next(true);
    }

    AttemptTouristLogin(credentials) {
        let url = '/login/tourist';
        return this.apiService.post(url, credentials).pipe(
            map(data => {
                console.log(data);
            // this.setAuth(data.get('token'));
            // this.saveUser(data.get('Tourist'));
            this.setAuth(data.body.token);
            this.saveUser(data.body.guide, 'tourist');
            //   console.log("login res",data.headers.get('authorization'));
            //   this.setAuth(data.headers.get('authorization'));
            //   this.getUserById(data.headers.get('ID'));
              return data;
            }
        ));
    }

    AttemptGuideLogin(credentials) {
        let url = '/login/guide';
        return this.apiService.post(url, credentials).pipe(
            map(data => {
                console.log(data);
                // console.log(data.body.token);
                // console.log(data.body.guide);
            this.setAuth(data.body.token);
            this.saveUser(data.body.guide, 'guide');
            //   console.log("login res",data.headers.get('authorization'));
            //   this.setAuth(data.headers.get('authorization'));
            //   this.getUserById(data.headers.get('ID'));
              return data;
            }
        ));
    }

    logout(role: string) {
        let url = '/'+ role + '/logout';
        this.apiService.get(url).subscribe(
            res=> {
                console.log('logout');
                this.purgeAuth();
                this.router.navigate(['/']);
            }, error => {
                console.log(error);
            }
        )
        
    }

    purgeAuth() {
        this.jwtService.destroyToken();
         // Set current user to an empty object
        this.currentUserSubject.next({});
        // Set auth status to false
        this.isAuthenticatedSubject.next(false);
        this.destroyUser();
    }

    getUser(role: string): string {
        return window.localStorage[role];
    }

    destroyUser() {
        window.localStorage.removeItem('guide');
        window.localStorage.removeItem('tourist');
        
    }

    saveUser(user, role: string) {
        window.localStorage[role] = JSON.stringify(user);
    }

    getCurrentUser(): any {
        return this.currentUserSubject.value;
      }

}