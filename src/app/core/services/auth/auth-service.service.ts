import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { log } from 'console';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
  baseUrl:string = "https://ecommerce.routemisr.com"
  private readonly _HttpClient = inject(HttpClient)
  setRegister(obj:object):Observable<any>{
      console.log(this.baseUrl);
      console.log(obj);
      return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`,obj)
  }

  login(obj:object):Observable<any>
  {
    console.log(obj);
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`,obj)
    
  }
}
