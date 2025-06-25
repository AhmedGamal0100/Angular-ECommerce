import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _http = inject(HttpClient);

  getProducts() {
    return this._http.get('https://dummyjson.com/products');
  }

  getProductDetail(id: number) {
    return this._http.get(`https://dummyjson.com/products/${id}`)
  }
}
