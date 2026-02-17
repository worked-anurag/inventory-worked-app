import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse } from '../models/login.model';
import { Observable, tap } from 'rxjs';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

login(formValue: any) {
  const payload = {
    username: formValue.email,  
    password: formValue.password
  };

  return this.http.post<LoginResponse>(
    `${this.apiUrl}/login`,
    payload
  ).pipe(
    tap((res) => {
      if (res?.data?.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userEmail', res.data.email);
      }
    })
  );
}
 logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

 getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
isLoggedIn(): boolean {
  const token = this.getToken();
  return !!token;
}

  forgotPassword(email: string) {

  const now = new Date().toISOString();

  return this.http.get<any>(
    `${this.apiUrl}/ops-user/forgot-password`,
    {
      params: {
        email: email,
        date: now
      }
    }
  );
}
}