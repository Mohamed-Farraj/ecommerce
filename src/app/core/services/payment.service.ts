import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enverionment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _HttpClient:HttpClient) { }
  token:any = sessionStorage.getItem('token');
  
  tokenHeader:any={token : this.token}

  payCash(data:any,cartid:string){
    console.log("hello from payment service",`${enverionment.baseUrl}/api/v1/orders/${cartid}`);
    return this._HttpClient.post(`${enverionment.baseUrl}/api/v1/orders/${cartid}`,{
      "shippingAddress":{...data}
    },{
      headers:this.tokenHeader
    })
  }

  payOnline(data:any,cartid:string){
    return this._HttpClient.post(`${enverionment.baseUrl}/api/v1/orders/checkout-session/${cartid}?url=${enverionment.serverUrl}`,{"shippingAddress":{...data}},{
      headers:this.tokenHeader
    })
  }

  getUserOrders(uid:string){
    return this._HttpClient.get(`${enverionment.baseUrl}/api/v1/orders/user/${uid}`,{
      headers:this.tokenHeader
    })
  }

}
