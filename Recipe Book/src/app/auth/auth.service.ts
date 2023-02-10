import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind?: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  APIkey = 'AIzaSyD_BffUxEppobwzffOyqBeI1dtROiWovrU';
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }


  signup(email: string, password: string,) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.APIkey,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    )
    .pipe(catchError(this.handleError), tap(resData => { 
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }));
  }

  login(email: string, password: string,) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.APIkey,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    )
    .pipe(catchError(this.handleError), tap(resData => { 
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }));
  }

  autoLogin = () => {
    const userData: { email: string, id: string, _token: string, _tokenExpirationDate: string } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) 
      return;
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    // if this user is valid and token on user object is valid (not expired)
    if (loadedUser.token) {
      this.user.next(loadedUser);
      // auto log out called after a user is auto logged in with calculated milliseconds
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }
  
  logout() {
    // this just resets the user object to null, removing authentication and disconnecting user from logged in
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    // clears the setTimeout from the program
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  autoLogout = (expirationDuration: number) => {
    this.tokenExpirationTimer = setTimeout(() => this.logout(), expirationDuration);
  }

  private handleAuthentication = (email: string, userId: string, token: string, expiresIn: number) => {
    // below takes the expiration date, which is the 3600 from the auth, and adds it to the current time to 
    // find when it expires
    const date = new Date(new Date().getTime() + expiresIn * 1000);
    const newUser = new User(email, userId, token, date);
    this.user.next(newUser);
    this.autoLogout(expiresIn*1000);
    // sets the user item in localstorage
    localStorage.setItem('userData', JSON.stringify(newUser));
  }

  private handleError = (errorRes: HttpErrorResponse) => {
    let message = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) return throwError(() => new Error(message));
    switch(errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        message = ' This email exists already!';
        break;
      case 'INVALID_PASSWORD':
        message = ' Invalid email or password was entered, please try again!';
        break;
      case 'EMAIL_NOT_FOUND':
        message = ' This email does not exist!';
        break;
    }
    return throwError(() => new Error(message));
  }
}
