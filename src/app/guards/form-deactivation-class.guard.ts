import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FormDeactivationClassGuard implements CanDeactivate<boolean> {
  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (component && component?.canDeActivate()) {
      const confirmation = confirm("You sure to go back?");
      if (confirmation) {
        return true;
      } else {
        return false
      }
    }
    return true;
  }

}
