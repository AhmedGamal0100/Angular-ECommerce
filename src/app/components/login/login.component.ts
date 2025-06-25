import { Component, effect, EventEmitter, inject, output, Output, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { PlatformLocation } from '@angular/common';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, Message],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _localStorageService = inject(LocalStorageService);
  private _router = inject(Router);
  private _authLogin = signal(false);
  private _platformLocation = inject(PlatformLocation);
  notCorrectEmail = signal(false);

  constructor() {
    effect(() => {
      // this._localStorageService.setIsLogin(this._authLogin());
    })
  }

  ngOnInit() {
    history.pushState(null, '', location.href);
    this._platformLocation.onPopState(() => {
      history.pushState(null, '', location.href);
    })
  }

  submit(val: NgForm) {
    this._authLogin.set(
      this._localStorageService.authLogin(
        val.form.controls['email'].value,
        val.form.controls['password'].value
      ));
    this._authLogin.set(this._authLogin());
    this._localStorageService.setIsLogin(this._authLogin());
    if (this._authLogin()) {
      this._router.navigateByUrl('/products');
    } else {
      this.notCorrectEmail.set(true);
    }
  }
}
