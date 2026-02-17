import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth API] Login Success',
  props<{ user: any }>()
);

export const loginFailure = createAction(
  '[Auth API] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');