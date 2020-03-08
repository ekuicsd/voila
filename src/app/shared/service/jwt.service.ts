import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getToken(): string {
    return window.localStorage['jwtToken'];
  }

  setToken(token: string) {
    window.localStorage['jwtToken'] = token;
  }

  deleteToken() {
    window.localStorage.removeItem('jwtToken');
  }
}
