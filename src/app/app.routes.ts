import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'category/:catName/:id',
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
    path: 'category/:categoryName',
    loadComponent: () =>
      import('./feature/category/category.component').then(
        (c) => c.CategoryComponent,
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./feature/admin/admin.routes').then((r) => r.ADMIN_ROUTES),
  },

  {
    path: '**',
    loadComponent: () =>
      import('./core/not-found/not-found.component').then(
        (c) => c.NotFoundComponent,
      ),
  },
];
