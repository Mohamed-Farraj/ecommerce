import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enverionment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  private readonly _HttpClient = inject(HttpClient)
  token:any = sessionStorage.getItem('token');
  tokenHeader:any={token : this.token}

  addToCart(id:string){
    return this._HttpClient.post(`${enverionment.baseUrl}/api/v1/cart`,{"productId":id},{headers:this.tokenHeader})
  }
  getCart(){
    return this._HttpClient.get(`${enverionment.baseUrl}/api/v1/cart`,{headers:this.tokenHeader})
  }

  removeFromCart(id:string):Observable<any>{
    return this._HttpClient.delete(`${enverionment.baseUrl}/api/v1/cart/${id}`,{headers:this.tokenHeader})
  }

  updateCart(id:string,count:string){
    return this._HttpClient.put(`${enverionment.baseUrl}/api/v1/cart/${id}`,{count:count},{headers:this.tokenHeader})
  }

  clearCart(){
    return this._HttpClient.delete(`${enverionment.baseUrl}/api/v1/cart`,{headers:this.tokenHeader})
  }

}
