import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { Router } from "@angular/router";


import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

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
        this.destroyUser();
        let url = '/login/tourist';
        return this.apiService.post(url, credentials).pipe(
            map(data => {
                console.log(data);
            this.setAuth(data.body.token);
            this.saveUser(data.body.Tourist, 'tourist');
              return data;
            }
        ));
    }

    AttemptGuideLogin(credentials) {
        this.destroyUser();
        let url = '/login/guide';
        return this.apiService.post(url, credentials).pipe(
            map(data => {
                console.log(data);
            this.setAuth(data.body.token);
            this.saveUser(data.body.guide, 'guide');
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
        window.localStorage.removeItem('role');
        
    }

    saveUser(user, role: string) {
       window.localStorage['role'] = role;
       window.localStorage[role] = JSON.stringify(user);
    }

    getCurrentUser(): any {
        return this.currentUserSubject.value;
    }

    getUserByEmail(email, role) : Observable<any> {
        let url = '/getUserByEmail/' + role + '/' + email;
        return new Observable<any>(obs => {
            this.apiService.get(url).subscribe(res => {
                obs.next(res.profile);
            })
        });
    }

    getRole(): string {
        return window.localStorage['role'];
    }

    getProfile(role: string) : Observable<any> {
        console.log(role);
        let url = '/' + role + '/myProfile';
        return new Observable<any>(obs => {
            this.apiService.get(url).subscribe(res => {
                obs.next(res.user);
            })
        });
    }

}