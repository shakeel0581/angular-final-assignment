import { Injectable } from '@angular/core';
import { User } from './User';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'https://api.escuelajs.co/api/v1';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    public router: Router
  ) {}

  // Sign-up
  signUp(user: User): Observable<any> {
    this.spinner.show();
    let api = `${this.endpoint}/users`;
    return this.http.post(api, user).pipe(
      catchError((error: HttpErrorResponse) => {
        this.spinner.hide();
        return this.handleError(error); // Correct way to call the function
      })
    );
  }
  // Sign-in
  async signIn(user: User) {
    this.spinner.show();
    return this.http
      .post<any>(`${this.endpoint}/auth/login`, user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.spinner.hide();
          return this.handleError(error); // Correct way to call the function
        })
      )
      .subscribe((res: any) => {
        this.spinner.hide();
        localStorage.setItem('access_token', res.access_token);
        this.getUserProfile(res.access_token).subscribe((res) => {
          this.currentUser = res;

          this.router.navigate(['user-profile/']);
        });
      });
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  isLoggedIn() {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }
  // User profile
  getUserProfile(token: any): Observable<any> {
    let api = `${this.endpoint}/auth/profile`;
    const newHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(api, { headers: newHeader }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    // this.spinner.hide();
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    alert(msg);

    return throwError(msg);
  }
}
