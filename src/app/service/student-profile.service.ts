import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StudentProfileService {

  private apiUrl = `${environment.apiUrl}/auth/admin-panel-dashboard/student-profiles`;

  constructor(private http: HttpClient) {}

  getStudentProfiles(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }
}