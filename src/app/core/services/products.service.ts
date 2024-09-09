import { HttpClient, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enverionment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _HttpClient = inject(HttpClient)

  getAllProducts()
  {
    return this._HttpClient.get(`${enverionment.baseUrl}/api/v1/products/`)
  }
  getSpecificProduct(id:string)
  {
    return this._HttpClient.get(`${enverionment.baseUrl}/api/v1/products/${id}`)
  }

  

}
