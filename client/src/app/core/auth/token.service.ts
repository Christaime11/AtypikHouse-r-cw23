import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  private issuer = {
    login: 'http://127.0.0.1:8000/api/login',
    register: 'http://127.0.0.1:8000/api/register'
  };

  constructor() { }

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
    // return this.isValidToken();
    if (localStorage.getItem('access_token')) {
      return true;
    } else {
      return false;
    }
  }

  // Remove token
  // tslint:disable-next-line:typedef
  removeToken(){
    localStorage.removeItem('access_token');
  }

}
