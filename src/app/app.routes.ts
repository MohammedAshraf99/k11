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
        (c) => c.CheckoutComponent,
      ),
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./feature/fav-product/fav-product.component').then(
        (c) => c.FavProductComponent,
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./feature/cart/cart.component').then((c) => c.CartComponent),
  },
   {
    path: 'category/perfumes',
    loadComponent: () =>
      import('./feature/category/category.component').then((c) => c.CategoryComponent),
  },
  
   {
    path: 'category/balloons',
    loadComponent: () =>
      import('./feature/balloon/balloon.component').then((c) => c.BalloonComponent),
  },
  {
    path: 'category/gifts',
    loadComponent: () =>
      import('./feature/gifts/gifts.component').then((c) => c.GiftsComponent),
  },

   {
    path: 'category/deals',
    loadComponent: () =>
      import('./feature/deals/deals.component').then((c) => c.HotdealsComponent),
  }, {
    path: 'admin',
    loadComponent: () =>
      import('./feature/admin/admin.component').then(
        (c) => c.AdminComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/not-found/not-found.component').then(
        (c) => c.NotFoundComponent,
      ),
  },
];
