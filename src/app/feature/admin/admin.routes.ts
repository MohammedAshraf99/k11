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
          import('./promobannermange/promobannermange.component').then(
            (m) => m.PromobannermangeComponent,
          ),
      },
      {
        path: 'checkout-list',

        loadComponent: () =>
          import('./checkoutlist/checkoutlist.component').then(
            (m) => m.CheckoutlistComponent,
          ),
      },

      
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./product-admin/product-admin.component').then(
            (m) => m.ProductComponent,
          ),
      },
         {
        path: 'announcement',
        loadComponent: () =>
          import('./announcement-admin/announcement-admin.component').then(
            (m) => m.AnnouncementAdminComponent,
          ),
      },
      
         {
        path: 'coupon',
        loadComponent: () =>
          import('./coupon-modal/coupon-modal.component').then(
            (c) => c.CouponModalComponent,
          ),
      },
    ],
  },
];
