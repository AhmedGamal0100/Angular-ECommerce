import { inject, Injectable, signal } from '@angular/core';
import { IProducts } from '../interface/products';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private _productService = inject(ProductsService);
  private _id = signal<number | null>(null)

  setId(val: number | null) {
    this._id.set(val !== undefined && val !== null ? val : null);
  }

  getProduct(): any {
    const id = this._id();
    if (id === null) {
      return null;
    }
    return this._productService.getProductDetail(id);
  }
}
