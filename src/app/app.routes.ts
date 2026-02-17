import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { ResetPassword } from './pages/reset-password/reset-password';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
     { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'reset-password', component: ResetPassword },

  {
  path: 'dashboard',
  loadComponent: () =>
    import('./pages/dashboard/dashboard')
      .then(m => m.Dashboard),
       canActivate: [authGuard] 
}

];
