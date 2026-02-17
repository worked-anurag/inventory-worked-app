import { Routes } from '@angular/router';
import { Dashboard } from './dashboard';
// import { HomeComponent } from './home';
import { StudentProfile } from './components/student-profile/student-profile';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      {
        path: 'student-profile',
        loadComponent: () =>
          import('./components/student-profile/student-profile')
            .then(m => m.StudentProfile)
      },
      {
        path: '',
        redirectTo: 'student-profile',
        pathMatch: 'full'
      }
    ]
  }
];