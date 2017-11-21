import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs/Observable";
//import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { tokenNotExpired } from 'angular2-jwt';
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

const USER_URL: string = environment.apiUrl + '/admins';

@Injectable()
export class AuthService {
  //@LocalStorage('token')
  public token: string;
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: Http, private _router: Router) {
    // set token if saved in local storage
    this.token = localStorage.getItem('token');
  }


  /**
   * if we have token the user is loggedIn
   * @returns {boolean}
   */
  public hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(USER_URL + '/login', { username: username, password: password })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().id;
        if (token) {
          // set token property
          this.token = token;
          localStorage.setItem('token', this.token);
          this.isLoginSubject.next(true);

          // store username and jwt token in local storage to keep user logged in between page refreshes
          //localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('token');
    this.isLoginSubject.next(false);
  }

  /**
  *
  * @returns {Observable<T>}
  */
  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  /**
   * Error handling method
   */
  // public handleError(error: Response | any) {
  //   console.error('ApiService::handleError', error);
  //   this._router.navigate(['/login']);
  //   return Observable.throw(error);
  // }
}