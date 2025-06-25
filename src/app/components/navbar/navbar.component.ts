import { Component, DoCheck, effect, EventEmitter, inject, OnChanges, Output, signal, ViewEncapsulation } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { IProducts } from '../../interface/products';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements DoCheck {
  private _cartService = inject(CartService)
  private _localStorageService = inject(LocalStorageService)

  enumerator = 0;
  isLogin = signal<boolean>(this._localStorageService.getIsLogin());

  constructor() {
    effect(() => {
      this.isLogin.set(this._localStorageService.getIsLogin());
    })
  }

  ngDoCheck(): void {
    this.enumerator = this._cartService.getEnumerator();
  }

  loggingOut() {
    this._localStorageService.setIsLogin(false);
  }
}
