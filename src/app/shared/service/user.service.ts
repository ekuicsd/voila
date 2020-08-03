import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { Router } from "@angular/router";


import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { SearchService } from './search.service';

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
        private searchService: SearchService,
        private router: Router,
    ) {
        if(this.getRole() === 'tourist') {
            let user = JSON.parse(this.getUser('tourist'));
            this.searchService.extra_filter.interests = user.interests;
            this.searchService.extra_filter.languages = user.languages;
        }
        
    }

    setAuth(token) {
        this.jwtService.setToken(token);
        this.isAuthenticatedSubject.next(true);
    }

    AttemptTouristLogin(credentials) {
        this.destroyUser();
        let url = '/login/tourist';
        return this.apiService.post(url, credentials).pipe(
            map(data => {
                if(data.body.success) {
                    this.setAuth(data.body.token);
                    this.saveUser(data.body.Tourist, 'tourist');
                    this.searchService.extra_filter.interests = data.body.Tourist.interests;
                    this.searchService.extra_filter.languages = data.body.Tourist.languages;
                }
              return data.body;
            }
        ));
    }

    AttemptGuideLogin(credentials) {
        this.destroyUser();
        let url = '/login/guide';
        return this.apiService.post(url, credentials).pipe(
            map(data => {
                if(data.body.success) {
                    this.setAuth(data.body.token);
                    this.saveUser(data.body.guide, 'guide');
                }
              return data.body;
            }
        ));
    }

    AttemptAdminLogin(credentials)  {
        this.destroyUser();
        let url = '/login/admin';
        return this.apiService.post(url, credentials).pipe(
            map(data => {
                if(data.body.success) {
                    this.setAuth(data.body.token);
                    window.localStorage['role'] = 'admin';
                }
              return data.body;
            }
        ));
    }

    logout(role: string) {
        let url = '/'+ role + '/logout';
        this.apiService.get(url).subscribe(
            res=> {
                this.purgeAuth();
                this.searchService.extra_filter.interests = [];
                this.searchService.extra_filter.languages = []
                this.router.navigate(['/']);
            }, error => {
            }
        ); 
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
        // console.log(role);
        let url = '/' + role + '/myProfile';
        return new Observable<any>(obs => {
            this.apiService.get(url).subscribe(res => {
                obs.next(res.user);
            })
        });
    }

    sosAlert(role, request) {
        let url = '/' + role + '/report';
        return new Observable<any>(obs => {
            this.apiService.post(url, request).subscribe(res => {
                obs.next(res);
            });
        });
    }

    getBookingInfobyId(role, id): Observable<any> {
        let url = '/' + role + '/bookingInfo/' + id;
        return new Observable<any>(obs => {
            this.apiService.get(url).subscribe(res => {
                obs.next(res);
            })
        });
    }

}