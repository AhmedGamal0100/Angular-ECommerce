import { Component, effect, inject, OnChanges, OnInit, signal } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { IProducts } from '../../../interface/products';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Message } from 'primeng/message';
import { TotalPricePipe } from "../../../pipes/total-price.pipe";
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [TableModule, TagModule, RatingModule, ButtonModule, Message, CommonModule, FormsModule, TotalPricePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers: []
})
export class CartComponent implements OnInit {
  private _cartService = inject(CartService);
  private _router = inject(Router);
  objectInCart!: IProducts[];
  totalBuyingPrice = signal<number>(0)

  constructor() {
    effect(() => {
      this.totalBuyingPrice.set(this._cartService.getTotalPrice());
    })
  }

  ngOnInit() {
    this.objectInCart = this._cartService.getInCart();
    this.totalPrice();
  }

  increment(product: IProducts) {
    if (product.stock > 0 && product.quantity < product.stock) {
      product.quantity = (product.quantity || 0) + 1;
      this.objectInCart = [...this.objectInCart];
    }
  }

  decrement(product: IProducts) {
    if (product.quantity && product.quantity > 1) {
      product.quantity--;
      this.objectInCart = [...this.objectInCart];
    }
  }

  removeItem(product: IProducts) {
    this._cartService.removeFromCart(product);
    this.objectInCart = this._cartService.getInCart();
    this.totalPrice();
    if (this.objectInCart.length == 0) {
      this._router.navigateByUrl('/products');
    }
  }

  totalPrice() {
    this.objectInCart.forEach(product => {
      this._cartService.addInTotalPrice(product.price);
    })
  }

  get totalPriceValue(): number {
    return this.objectInCart.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0);
  }
}
