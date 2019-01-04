import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import * as gobalUrl from './commonurl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = gobalUrl.commonUrl + 'auth/login';
  private signupUrl = gobalUrl.commonUrl + 'auth/signup';
  private forgotUrl = gobalUrl.commonUrl + 'auth/forgot';
  private resetpasswordUrl = gobalUrl.commonUrl + 'auth/resetpassword';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
  }

  public login(user): Observable<any> {
    return this.http.post(this.loginUrl, user);
  }

  expSession() {
    let expTime = JSON.parse(localStorage.getItem('currentUser')).expTime;
    let currentTime = moment().format('x');
    if (expTime < currentTime) {
      this.logout();
      return false;
    } 
    return true;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/signin']);
  }

  isLogin() {
    if (localStorage.getItem('currentUser')) {
        return true;
     }
    return false;
  }

  public signup(user): Observable<any>{
    return this.http.post(this.signupUrl, user);
  }

  public forgot(user): Observable<any>{
    return this.http.post(this.forgotUrl, user);
  }

  public resetPassword(user): Observable<any>{
    return this.http.post(this.resetpasswordUrl, user);
  }
}
