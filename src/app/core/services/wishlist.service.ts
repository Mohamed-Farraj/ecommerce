import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enverionment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient : HttpClient) { }
  token:any = sessionStorage.getItem('token');
  tokenHeader:any={token : this.token}
  getWishlist():Observable<any>{
    return this._HttpClient.get(`${enverionment.baseUrl}/api/v1/wishlist`,{headers:this.tokenHeader})
  }

  addWishlist(id:string):Observable<any>{
    return this._HttpClient.post(`${enverionment.baseUrl}/api/v1/wishlist`,{ "productId":id },{headers:this.tokenHeader})
  }
  removeWishlist(id:string):Observable<any>{
    return this._HttpClient.delete(`${enverionment.baseUrl}/api/v1/wishlist/${id}`,{headers:this.tokenHeader})
  }



}
