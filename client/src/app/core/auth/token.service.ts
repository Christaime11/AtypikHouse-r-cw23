import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class TokenService {

  private issuer = {
    login: environment.loginApiURL,
    register: environment.registerApiUrl
  };
  
  error: any;
  canGetData: boolean;
  UserProfile: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  protected  baseUrl: string = environment.apiURL;


  /*
   * Verify if user data can be retrieved from the api. On this function depends the CanActivate auth guard.
   */
  canGetuserData(){
    this.http.get(this.baseUrl + 'users/user-profile').subscribe(
      data => {
        this.UserProfile = data;
      },
      err => {
        this.error = err.status;
        if (this.UserProfile) {
          localStorage.setItem('canGetData', 'true');
          this.canGetData = true;
        } else {
          localStorage.setItem('canGetData', 'false');
          localStorage.removeItem('access_token');
          this.canGetData = false;
        }
      }, () => {
        console.log("this.canGetData = " + this.canGetData)
      });
  }

  // tslint:disable-next-line:typedef
  handleData(token){
    localStorage.setItem('access_token', token);
  }

  // tslint:disable-next-line:typedef
  getToken(){
    return localStorage.getItem('access_token');
  }

  // tslint:disable-next-line:typedef
  payload(token) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // Verify the token
  // tslint:disable-next-line:typedef
  isValidToken(){
     const token = this.getToken();

     if (token){
      const payload = this.payload(token);
       if (payload){
         return  Object.values(this.issuer).indexOf(payload.iss) > -1;}
     } else {
        return false;
     }

  }

  // User state based on valid token
  // tslint:disable-next-line:typedef
  isLoggedIn() {
    this.canGetuserData();
    // return this.isValidToken();

    if (this.canGetData = true) {
      return true;
    } else {
      return false;
    }

    /*if (localStorage.getItem("access_token")) {
      return true;
    } else {
      return false;
    }*/
  }

  // Remove token
  // tslint:disable-next-line:typedef
  removeToken(){
    localStorage.removeItem('access_token');
  }

}
