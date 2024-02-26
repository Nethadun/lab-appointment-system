import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  private apiUrl = 'http://localhost:8082';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const data ={
      username:username,
      password:password
    }
    return this.http.post<any>(`${this.apiUrl}/api/auth`,  data );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/register`, userData);
  }

  verifyOTP(otpData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/register/verify`, otpData );
  }
}
