import { Injectable } from '@angular/core';
// import jwtDecode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private jwtHelper: JwtHelperService;
  constructor( ) {
    this.jwtHelper = new JwtHelperService();
   }

  getUserRole(): any {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken;
    } else {
      return null;
    }
  }
}
