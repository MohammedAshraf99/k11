import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { useridGuard } from './core/guards/userid.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'category/:catName/:id',
    loadComponent: () =>
      import('./feature/item-details/item-details.component').then(
        (c) => c.ItemDetailsComponent,
      ),
    title: (route) => `${route.paramMap.get('catName')}`, // Dynamic title
  },
  {
    path: 'checkout',
    canMatch: [useridGuard],
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
    title: 'Cart',
  },
  {
    path: 'category/:categoryName',
    loadComponent: () =>
      import('./feature/category/category.component').then(
        (c) => c.CategoryComponent,
      ),
    title: (route) => `${route.paramMap.get('categoryName')}`, // Dynamic title
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./core/orders-history/orders-history.component').then(
        (c) => c.OrdersHistoryComponent,
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
