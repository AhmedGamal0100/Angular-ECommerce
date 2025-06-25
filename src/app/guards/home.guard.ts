
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

export const homeGuard: CanActivateFn = (route, state) => {
  const authService = inject(LocalStorageService);
  const router = inject(Router);

  return authService.getIsLogin() ? true : router.createUrlTree(['/products']);
};
