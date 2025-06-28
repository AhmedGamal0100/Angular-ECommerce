import { Component, effect, inject, OnChanges, OnInit, signal } from '@angular/core';
import { WishListStore } from '../../../stores/wish-list.store';
import { IProducts } from '../../../interface/products';
import { RouterModule } from '@angular/router';
import { DiscountPricePipe } from "../../../pipes/discount-price.pipe";
import { TotalPricePipe } from "../../../pipes/total-price.pipe";
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { CartService } from '../../../services/cart.service';


@Component({
  selector: 'app-wish-list',
  imports: [RouterModule, DiscountPricePipe, TotalPricePipe, CommonModule, Toast],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
  providers: [MessageService]
})
export class WishListComponent implements OnInit {
  private _wishList = inject(WishListStore)
  private _messageService = inject(MessageService)
  private _cartService = inject(CartService)
  wishList = signal<IProducts[]>(this._wishList.wishList())
  isClickedMap = signal<{ [id: number]: boolean }>({});
  isWish = signal<boolean>(true);

  constructor() {
    effect(() => {
      this.wishList.set(this._wishList.wishList())
    })
  }

  ngOnInit() {
    const cartItems: IProducts[] = this._cartService.getInCart();
    const clickedMap: { [id: number]: boolean } = {};
    this.wishList().forEach(item => {
      clickedMap[item.id] = cartItems.some(cartItem => cartItem.id === item.id);
    });
    this.isClickedMap.set(clickedMap);

  }

  removeFromWish(id: number) {
    const product = this.wishList().find(p => p.id === id);
    if (product) {
      this._wishList.removeFromWishList(product);
      this.isWish.set(false);
      this.showNotify('Item removed', 'Item has been removed from your wish list!')
    }
  }

  addToCart(id: number) {
    const product = this.wishList().find(p => p.id === id);
    const clicked = this.isClickedMap()[id] || false;
    if (!clicked) {
      if (product) {
        this._cartService.setInCart(product);
      }
      this.isClickedMap.set({ ...this.isClickedMap(), [id]: true });
      this._cartService.getInCart();
      this.showNotify("Added Item", "New item has been added!");
    } else {
      if (product) {
        this._cartService.removeFromCart(product);
        this.isClickedMap.set({ ...this.isClickedMap(), [id]: false });
        this._cartService.getInCart();
        this.showNotify("Item Removed ", "Item has been removed!");
      }
    }
  }

  showNotify(summaryPar: string, detailPar: string) {
    this._messageService.add({ severity: 'secondary', summary: summaryPar, detail: detailPar });
  }
}
