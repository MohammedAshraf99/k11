import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '', // المسار الرئيسي للـ Admin Layout
    outlet: 'admin',
    loadComponent: () =>
      import('./admin.component').then((m) => m.AdminComponent),
    children: [
      { path: '', outlet: 'admin', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'banner',

        loadComponent: () =>
          import('./banner/banner.component').then((m) => m.BannerComponent),
      },
        {
        path: 'promo-banner',

        loadComponent: () =>
          import('./promobannermange/promobannermange.component').then((m) => m.PromobannermangeComponent),
      },
      {
        path: 'product',
        loadComponent: () =>
          import('./product/product.component').then((m) => m.ProductComponent),
      },
    ],
  },
];
