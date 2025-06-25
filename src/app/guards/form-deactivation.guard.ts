import { CanDeactivateFn, Router } from '@angular/router';

export const formDeactivationGuard: CanDeactivateFn<any> = (component, currentRoute, currentState, nextState) => {
  if (component && component?.registerForm.valid) {
    return true;
  } else if (component && component?.canDeActivate()) {
    return new Promise<boolean>(resolve => {
      component.showConfirm(resolve);
    });
  }
  return true;
};