import { Injectable, signal } from '@angular/core';
import { IProducts } from '../interface/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _inCart = signal<IProducts[]>([]);
  private _totalBuyingPrice = signal<number>(0)

  setInCart(productObj: IProducts) {
    const existing = this._inCart().find(item => item.id === productObj.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
      this._inCart.set([...this._inCart()]);
    } else {
      this._inCart.set([...this._inCart(), { ...productObj, quantity: 1 }]);
    }
  }

  addInCartFromDetails(productObj: IProducts) {
    if (typeof productObj.quantity === 'number' && productObj.quantity > 0) {
      const existing = this._inCart().find(item => item.id === productObj.id);
      if (existing) {
        existing.quantity += productObj.quantity;
        this._inCart.set([...this._inCart()]);
      } else {
        this._inCart.set([...this._inCart(), { ...productObj }]);
      }
    } else {
      this.setInCart(productObj);
    }
  }

  removeFromCart(productObj: IProducts) {
    const updatedCart = this._inCart().filter(item => item.id !== productObj.id);
    this._inCart.set(updatedCart);
  }

  getInCart() {
    return this._inCart();
  }

  getEnumerator(): number {
    return this._inCart().length;
  }

  zeroTotalPrice() {
    this._totalBuyingPrice.set(0);
  }

  addInTotalPrice(val: number) {
    this._totalBuyingPrice.update(prev => prev + val);
  }

  removeFromTotalPrice(val: number) {
    this._totalBuyingPrice.update(prev => prev - val);
  }

  getTotalPrice(): number {
    return this._inCart().reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  }


}
