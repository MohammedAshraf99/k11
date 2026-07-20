import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./feature/item-details/item-details.component').then(
        (m) => m.ItemDetailsComponent,
      ),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./feature/checkout/checkout.component').then(
        (m) => m.CheckoutComponent,
      ),
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./feature/fav-product/fav-product.component').then(
        (m) => m.FavProductComponent,
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./feature/cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
