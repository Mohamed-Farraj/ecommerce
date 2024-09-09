import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { log } from 'console';
import { Observable } from 'rxjs';
import { enverionment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
  userData:any;
  private readonly _HttpClient = inject(HttpClient)
  private readonly _Router =  inject(Router)
  setRegister(obj:object):Observable<any>{
      console.log(enverionment.baseUrl);
      console.log(obj);
      return this._HttpClient.post(`${enverionment.baseUrl}/api/v1/auth/signup`,obj)
  }

  login(obj:object):Observable<any>
  {
    console.log(obj);
    return this._HttpClient.post(`${enverionment.baseUrl}/api/v1/auth/signin`,obj)
    
  }

  deJWT()
  {
    console.log(jwtDecode(sessionStorage?.getItem('token') !) );
    this.userData = jwtDecode(sessionStorage?.getItem('token') !)
    return jwtDecode(sessionStorage?.getItem('token') !)
  }

  logout()
  {
    sessionStorage.removeItem("token")
    this.userData = null;
    this._Router.navigate(['/login'])
  }

  forgotPassword(data:object):Observable<any>{
    console.log("Forgot Password:",data);
    return this._HttpClient.post(`${enverionment.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }

  verifyResetCode(data:object):Observable<any>{
    console.log("verifyResetCode:",data)
    return this._HttpClient.post(`${enverionment.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }

  resetPassword(data:object):Observable<any>{
    return this._HttpClient.put(`${enverionment.baseUrl}/api/v1/auth/resetPassword`,data)
  }




}
