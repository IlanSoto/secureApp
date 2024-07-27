import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedFlag = false;

  constructor(private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    // Lógica de autenticación simulada (aquí se podria realizar una llamada HTTP real)
    if (username === 'user' && password === 'password') {
      this.isAuthenticatedFlag = true;
      return of(true);
    } else {
      return of(false);
    }
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedFlag;
  }

  logout(): void {
    this.isAuthenticatedFlag = false;
    this.router.navigate(['/public']);
  }
}
