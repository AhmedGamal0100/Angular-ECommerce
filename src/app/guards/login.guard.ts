import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(LocalStorageService);
  const router = inject(Router);
  if (!JSON.parse(sessionStorage.getItem('token') ?? 'null')) {
    return authService.getIsLogin() ? true : router.createUrlTree(['/login']);
  }
  return true;
};

