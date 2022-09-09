import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

// const cors = require('cors');

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*
  why do we create a service?
  -> to be shared on all components
  -> we can't share or inject component inside another component
  */

  baseUrl:any = "https://routeegypt.herokuapp.com";

  constructor(private _HttpClient : HttpClient) {

  }

  signUp(data:any) : Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/signup`, data);
  }

  signIn(data:any) : Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/signin`, data);
  }

  signOut(data:any) : Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/signOut`, data);
  }

  isLoggedIn(){
    return !!localStorage.getItem('TOKEN'); // make it boolean with '!' .. false then true
  }

}
