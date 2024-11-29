import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommonService {



  private baseUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  login(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, payload);
  }

  sendOtp(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sendOTP`, payload);
  }

  removeEmail(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sendOTP`, payload);
  }

  verifyOTP(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/verifyOTP`, payload);
  }

  updatePassword(payload: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/userupdatepassword`, payload);
  }

  fetchUserDetails(id?: any, name?: string): Observable<any> {
    const token = this.getToken()
    let url;
    if(id){
    url = id ? `${this.baseUrl}/user/${id}` : `${this.baseUrl}/user`;
  }else{
    url = name ? `${this.baseUrl}/user/?name=${name}` : `${this.baseUrl}/user`;
  }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(url, { headers });
  }

  createUserDetails(payload?: any): Observable<any> {
    const token = this.getToken()
    const url =`${this.baseUrl}/user`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(url, payload, { headers });
  }

  updateUserDetails(id?: any,payload?: any): Observable<any> {
    const token = this.getToken()
    const url = id ? `${this.baseUrl}/user/${id}` : `${this.baseUrl}/user`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(url, payload, { headers });
  }

  removeUser(id:any): Observable<any> {
    const token = this.getToken()
    const url = `${this.baseUrl}/user/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(url,{ headers });
  }


  fetchProjectDetails(id?: any): Observable<any> {
    const token = this.getToken()
    const url = id ? `${this.baseUrl}/project/${id}` : `${this.baseUrl}/project`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(url, { headers });
  }

  createProjectDetails(payload?: any): Observable<any> {
    console.log(payload)
    const token = this.getToken()
    const url = `${this.baseUrl}/project`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(url, payload,{ headers });
  }

  updateProjectDetails(id?: any,payload?: any): Observable<any> {
    const token = this.getToken()
    const url = id ? `${this.baseUrl}/project/${id}` : `${this.baseUrl}/project`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(url, payload, { headers });
  }

  removeProject(id?: any): Observable<any> {
    const token = this.getToken()
    const url =`${this.baseUrl}/project/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(url, { headers });
  }

  getProjects(id?: any): Observable<any[]> {
    const token = this.getToken()
    const url = id ? `${this.baseUrl}/project/${id}` : `${this.baseUrl}/project`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ data: any[] }>(url, { headers }).pipe(
      mergeMap(response => {
        const projects = response.data;
        const userRequests = projects.map(project => 
          this.fetchUserDetails(project.userId).pipe(
            map(user => ({
              ...project,
              userName: user?.data?.name
            }))
          )
        )
        return forkJoin(userRequests) as Observable<any[]>;;
      })
    );
  }
}

