import { CommonModule } from '@angular/common';
import { Component, DoCheck, EventEmitter, inject, input, OnInit, Output, output, signal, SimpleChange, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';
import { IProducts } from '../../../interface/products';
import { CartService } from '../../../services/cart.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ProductDetailsService } from '../../../services/product-details.service';

@Component({
  selector: 'app-single-product',
  imports: [CommonModule, Rating, FormsModule, Toast, ButtonModule, RouterModule],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss',
  providers: [MessageService]
})
export class SingleProductComponent {
  private _cartService = inject(CartService);
  private messageService = inject(MessageService);
  private _productDetails = inject(ProductDetailsService);
  ratingStars = signal(0);
  productObj = input<IProducts>();
  isClicked = signal<boolean>(false);
  objectInCart!: IProducts[];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productObj']) {
      this.ratingStars.set(Math.floor(this.productObj()?.rating ?? 0))
    }
    this.objectInCart = this._cartService.getInCart();
    this.objectInCart.forEach(objCard => {
      if (objCard.id == this.productObj()?.id) {
        this.isClicked.set(true);
      }
    })
  }

  addToCart() {
    const product = this.productObj()
    if (this.isClicked() == false) {
      if (product) {
        this._cartService.setInCart(product);
      }
      this.isClicked.set(true)
      this._cartService.getInCart()
      this.showNotify("Added Item", "New Item Has Been Added!");
    } else {
      if (product) {
        this._cartService.removeFromCart(product)
        this.isClicked.set(false)
        this._cartService.getInCart()
        this.showNotify("Item Removed ", "Item Has Been Removed!");
      }
    }
  }

  showNotify(summaryPar: string, detailPar: string) {
    this.messageService.add({ severity: 'secondary', summary: summaryPar, detail: detailPar });
  }

  onProductClick(product?: IProducts) {
    if (product) {
      this._productDetails.setId(product.id);
    }
  }
}
