import { Component, DoCheck, effect, inject, OnChanges, OnDestroy, OnInit, signal, SimpleChanges } from '@angular/core';
import { SingleProductComponent } from "./single-product/single-product.component";
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';
import { IProducts } from '../../interface/products';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  imports: [SingleProductComponent, InputTextModule, FormsModule, FloatLabel, RouterModule],
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  private _productsService = inject(ProductsService);
  private _cartService = inject(CartService);
  private _router = inject(Router);
  searchInput = signal('');
  cardsObj: IProducts[] = [];
  subscription!: Subscription;
  routerSubscription!: Subscription;
  filteredProducts: IProducts[] = [];
  showList = true;

  constructor() {
    effect(() => {
      const searchInput = this.searchInput()
      this.filteredProducts = this.cardsObj.filter(card => card.title.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()));
    })
  }

  ngOnInit() {
    this.checkLocalStorage();
    this.routerSubscription = this._router.events.subscribe(() => {
      this.showList = !this._router.url.includes('/products/details/');
    });

    this.subscription = this._productsService.getProducts().subscribe({
      next: (data: any) => {
        this.cardsObj = data.products! as IProducts[];
        this.filteredProducts = this.cardsObj;
      },
      error: err => console.error('Failed to load API', err)
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  checkLocalStorage() {
    const cartProd = localStorage.getItem('cartItems');
    if (cartProd != null) {
      const products: IProducts[] = JSON.parse(cartProd);
      products.forEach(product => {
        this._cartService.setInCart(product);
      });
    }
  }
}
