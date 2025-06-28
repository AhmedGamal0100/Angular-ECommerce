import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { loginGuard } from './guards/login.guard';
import { formDeactivationGuard } from './guards/form-deactivation.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'register', canDeactivate: [formDeactivationGuard], loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent), pathMatch: 'full' },
    {
        path: 'products', canActivate: [loginGuard], loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent),
        children: [
            { path: 'details/:id', loadComponent: () => import('./components/products/single-product/single-product-details/single-product-details.component').then(m => m.SingleProductDetailsComponent), pathMatch: 'full' },
        ]
    },
    { path: 'cart', loadComponent: () => import('./components/products/cart/cart.component').then(m => m.CartComponent), pathMatch: 'full' },
    { path: 'wish', loadComponent: () => import('./components/products/wish-list/wish-list.component').then(m => m.WishListComponent), pathMatch: 'full' }
];