import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ContainerComponent } from "./components/container.component";
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  imports: [ContainerComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLogged = signal<boolean | null>(false);
  private _router = inject(Router)
  private _localStorageService = inject(LocalStorageService)

  constructor() {
    effect(() => {
      this.isLogged.set(JSON.parse(sessionStorage.getItem("token") ?? 'null'));
      if (!this.isLogged() || this.isLogged() === null) {
        this._router.navigateByUrl("")
        this._localStorageService.setIsLogin(false)

      } else {
        this._router.navigateByUrl("/products")
        this._localStorageService.setIsLogin(true)
      }
    })
  }
}
