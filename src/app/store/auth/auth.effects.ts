import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) =>
        this.http.post<any>(`${environment
            .apiUrl}/login`, {
          username: action.username,
          password: action.password
        }).pipe(
          map((res) => {
            localStorage.setItem('token', res.data.token);
            return AuthActions.loginSuccess({ user: res.data });
          }),
          catchError((err) =>
            of(
              AuthActions.loginFailure({
                error: err?.error?.errors?.[0] || 'Invalid credentials'
              })
            )
          )
        )
      )
    )
  );

  navigateOnSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigate(['/dashboard']))
      ),
    { dispatch: false }
  );
}