import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private _accountsList = signal<any[]>([]);
  private _isLogin = signal(sessionStorage.getItem('token') === 'true');

  setInLocalStorage(accountRegistered: any): void {
    this._accountsList().push(accountRegistered);
    localStorage.setItem("accountList", JSON.stringify(this._accountsList()));
  }

  getLocalStorage() {
    if (localStorage.getItem('accountList')) {
      this._accountsList.set(JSON.parse(localStorage.getItem("accountList") ?? 'any[]'));
      return this._accountsList();
    }
    return [];
  }

  authLogin(email: string, password: string): boolean {
    return this.getLocalStorage().some(account =>
      account.email === email && account.password === password
    );
  }

  setIsLogin(val: boolean) {
    this._isLogin.set(val);
    sessionStorage.setItem('token', val ? 'true' : 'false');
  }

  getIsLogin(): boolean {
    return this._isLogin();
  }
}
