import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductDetailsService } from '../../../../services/product-details.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IProducts } from '../../../../interface/products';
import { CartService } from '../../../../services/cart.service';
import { RouterModule } from '@angular/router';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DiscountPricePipe } from '../../../../pipes/discount-price.pipe';

@Component({
  selector: 'app-single-product-details',
  imports: [CommonModule, RouterModule, Toast, DiscountPricePipe],
  templateUrl: './single-product-details.component.html',
  styleUrl: './single-product-details.component.scss',
  providers: [MessageService]
})
export class SingleProductDetailsComponent implements OnInit, OnDestroy {
  private _productDetails = inject(ProductDetailsService);
  private _cartService = inject(CartService);
  private messageService = inject(MessageService)
  private _subscription!: Subscription;
  product!: IProducts;
  selectedImage!: string;

  ngOnInit(): void {
    this._subscription = this._productDetails.getProduct().subscribe({
      next: (data: IProducts) => {
        this.product = data! as IProducts;
        this.selectedImage = this.product?.thumbnail || this.product?.images?.[0];
        if (typeof this.product.quantity !== 'number') {
          this.product.quantity = 1;
        }
      },
      error: (err: IProducts) => console.error('Failed to load API', err)
    })
  }

  onSelectImage(img: string) {
    this.selectedImage = img;
  }

  increment(product: IProducts) {
    if (product.stock > 0 && product.quantity < product.stock) {
      product.quantity = (product.quantity || 0) + 1;
      this._cartService.addInTotalPrice(product.price);
    }
  }

  decrement(product: IProducts) {
    if (product.quantity && product.quantity > 1) {
      product.quantity--;
      this._cartService.removeFromTotalPrice(product.price);
    }
  }

  addToCart() {
    this._cartService.addInCartFromDetails(this.product);
    this.showNotify('Item Added', `${this.product.quantity} pieces added to your cart!`);
  }

  showNotify(summaryPar: string, detailPar: string) {
    this.messageService.add({ severity: 'secondary', summary: summaryPar, detail: detailPar });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
