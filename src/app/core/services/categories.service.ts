import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enverionment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }
  private readonly _HttpClient = inject(HttpClient)

  getAllCategories():Observable<any>{
    return this._HttpClient.get(`${enverionment.baseUrl}/api/v1/categories`)
  }

  getAllBrands():Observable<any>{
    return this._HttpClient.get(`${enverionment.baseUrl}/api/v1/brands`)
  }
 
}
