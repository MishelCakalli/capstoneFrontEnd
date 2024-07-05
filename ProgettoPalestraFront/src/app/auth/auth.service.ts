import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SignUp } from '../interfaces/sing-up';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = "http://localhost:8080/auth/";
  private jwtHelper = new JwtHelperService();
  private authSub = new BehaviorSubject<string | null>(null);
  user$ = this.authSub.asObservable();
  private timeout: any;

  constructor(private http: HttpClient, private router: Router) { }

  signup(data: SignUp): Observable<string> {
    return this.http.post(`${this.apiURL}register`, data, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  login(data: { email: string, password: string }): Observable<string> {
    return this.http.post<string>(`${this.apiURL}login`, data, { responseType: 'text' as 'json' }).pipe(
      tap((token: string) => {
        console.log('auth token: ', token);
        this.authSub.next(token);
        localStorage.setItem('user', token);
        this.autologout(token);
        this.router.navigate(['/home']);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    let errorMessage = 'Errore';
    if (error.error instanceof ErrorEvent) {
      console.error('A client-side or network error occurred:', error.error.message);
      errorMessage = `Errore: ${error.error.message}`;
    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
      if (error.error === 'Email already exists') {
        errorMessage = 'Utente già presente';
      } else if (error.error === 'Incorrect password') {
        errorMessage = 'Password errata';
      } else if (error.error === 'Cannot find user') {
        errorMessage = 'Utente inesistente';
      } else if (error.status === 0) {
        errorMessage = 'Errore di connessione. Verifica la tua connessione internet.';
      } else if (error.status >= 500) {
        errorMessage = 'Errore del server. Riprova più tardi.';
      }
    }
    return throwError(errorMessage);
  }

  logout() {
    this.authSub.next(null);
    localStorage.removeItem('user');
    clearTimeout(this.timeout);
    this.router.navigate(['/login']);
  }

  restore() {
    const token = localStorage.getItem('user');
    if (token) {
      this.authSub.next(token);
      this.autologout(token);
    }
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('user');
    return !!token;
  }

  private autologout(token: string) {
    const dateExpiration = this.jwtHelper.getTokenExpirationDate(token) as Date;
    const millisecondsExp = dateExpiration.getTime() - new Date().getTime();
    this.timeout = setTimeout(() => {
      this.logout();
    }, millisecondsExp);
  }

  getUtenteId(): number | null {
    const token = localStorage.getItem('user');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.id; // Supponendo che l'ID dell'utente sia presente nel token decodificato
    }
    return null; // Ritorna null se non c'è un token o se l'ID non è presente nel token
  }
  
}
