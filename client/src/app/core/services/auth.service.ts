import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Auth, Token } from '@interfaces/auth';
import { prefix } from '@shared/data/ruta.api';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private prefix = prefix + 'login/access-token';
  private cookieToken = environment.cookieToken

  public isLoggedIn$ : Subject<boolean> = new Subject();

  constructor(
    private http: HttpClient,
    private cookieSvc: CookieService,
    private router: Router
  ) { 
    this.isLoggedIn()
  }

  public Logged = new Subject<boolean>();

  login(auth: Auth) {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    );
    const body = `username=${auth.username}&password=${auth.password}`;
    return this.http.post<Token>(this.prefix, body, { headers: headers }).pipe(
      map(
      (data: Token) => {
        this.cookieSvc.delete(`${this.cookieToken}`, '/', '/')
        this.cookieSvc.set(`_${this.cookieToken}`, data.access_token, data.expires)
        this.Logged.next(true);
      }
    ))
  }

  isLoggedIn() {
    const tokenCheck = this.cookieSvc.check(`_${this.cookieToken}`)
    this.Logged.next(tokenCheck)
    return tokenCheck
  }

  getToken(): string {
    return this.cookieSvc.get(`_${this.cookieToken}`)
  }

  logOut() {
    this.cookieSvc.deleteAll()
    this.cookieSvc.delete(`${this.cookieToken}`)
    this.isLoggedIn()
    this.router.navigate(['/login'])
  }
}
