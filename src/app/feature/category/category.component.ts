import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductCategory } from '../admin/admin.component';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { DiscountPercentPipe } from '../../core/pipe/discount-percent.pipe';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../core/models/api';
import { environment } from '../../../enviroments/environment';

interface CategoryConfig {
  bgClass: string;
  breadcrumb: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  countLabel: (count: number) => string;
  countBadgeClass: string;
  btnClass: string;
  btnLabel: string;
  cardHoverClass: string;
}

@Component({
  selector: 'app-category',
  imports: [
    MatIcon,
    RouterLink,
    DecimalPipe,
    CurrencyPipe,
    DiscountPercentPipe,
  ],
  standalone: true,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private ProductService = inject(ProductService);
  product = inject(ProductsService);
  categoryName = signal<string>('perfumes');
  // categoryTitle = signal<string>('Luxury Fragrance Collection');
  products = signal<IProduct[]>([]);
  localhost = environment.baseUrl;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const categoryName = (params.get('categoryName') as string) ?? 'perfumes';
      this.categoryName.set(categoryName);
      this.getProducts(categoryName);
      this.dealProducts(categoryName);
    });
  }

  dealProducts(catName: string) {
    this.categoryName.set(catName as ProductCategory);
    if (catName === 'deals') {
      this.ProductService.dealsProduct<IProduct[]>().subscribe((res) => {
        for (let i = 0; i < res.data.length; i++) {
          // this.categoryName = res.data[i].category as any;
        }
        this.products.set(res.data as IProduct[]);
      });
    }
  }

  getProducts(categoryName: string) {
    this.product.getProducts(categoryName).subscribe((res) => {
  
   
      this.products.set(res.data as any as IProduct[]);
    });
  }

  // Category title passed via URL parameter (e.g., /perfumes/Niche%20Fragrances)

  private readonly categoryMap: Record<string, CategoryConfig> = {
    perfumes: {
      bgClass: 'bg-[#faf8f5]',
      breadcrumb: 'Fragrances',
      title: 'Luxury Fragrance Collection',
      description:
        'Explore artisanal scent pyramids crafted to complement your signature presence.',
      icon: 'local_florist',
      iconColor: 'text-amber-700',
      countLabel: (c) => `Available: ${c} Fragrances`,
      countBadgeClass: 'text-amber-900 bg-amber-100/60 border-amber-200/50',
      btnClass:
        'bg-amber-900 hover:bg-amber-950 text-amber-50 hover:shadow-amber-900/20',
      btnLabel: 'Discover',
      cardHoverClass: 'hover:text-amber-800',
    },
    balloons: {
      bgClass: 'bg-linear-to-b from-sky-50 via-pink-50/30 to-purple-50/50',
      breadcrumb: 'Balloons & Party Supplies',
      title: 'Balloon Collection',
      description:
        'Bring your events to life with custom arch setups, helium bouquets, and metallic numbers!',
      icon: 'celebration',
      iconColor: 'text-pink-500',
      countLabel: (c) => `Showing: ${c} Balloon Items`,
      countBadgeClass: 'text-purple-700 bg-purple-100/80 border-purple-200',
      btnClass:
        'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white hover:shadow-pink-500/25',
      btnLabel: 'Order Party Kit',
      cardHoverClass: 'hover:text-pink-600',
    },
    gifts: {
      bgClass: 'bg-[#faf7f2]',
      breadcrumb: 'Gifts & Celebrations',
      title: 'Curated Gift Hampers',
      description:
        'Thoughtfully curated gift sets designed to turn every moment into an unforgettable memory.',
      icon: 'card_giftcard',
      iconColor: 'text-rose-700',
      countLabel: (c) => `Curated Selection: ${c} Hampers`,
      countBadgeClass: 'text-rose-900 bg-rose-100/70 border-rose-200/60',
      btnClass:
        'bg-rose-900 hover:bg-rose-950 text-rose-50 hover:shadow-rose-900/20',
      btnLabel: 'Send Gift',
      cardHoverClass: 'hover:text-rose-800',
    },
    deals: {
      bgClass: 'bg-[#faf7f2]',
      breadcrumb: 'Hot Deals',
      title: 'Exclusive Celebration Combos',
      description:
        '3-in-1 Celebration Bundles: Get Perfumes & Curated Gifts together at exclusive savings!',
      icon: 'local_fire_department',
      iconColor: 'text-rose-600',
      countLabel: (c) => `Active Deals: ${c}`,
      countBadgeClass: 'text-rose-700 bg-rose-100 border-rose-200',
      btnClass:
        'bg-rose-600 hover:bg-rose-700 text-white hover:shadow-rose-600/20',
      btnLabel: 'Claim Deal',
      cardHoverClass: 'hover:text-rose-600',
    },
    
  roses: {
  bgClass: 'bg-gradient-to-b from-rose-50 via-red-50/30 to-pink-50/50',
  breadcrumb: 'Fresh Flowers & Roses',
  title: 'Rose Collection',
  description:
    'Express your feelings with hand-picked premium roses, luxury bouquets, and preserved floral arrangements!',
  icon: 'local_florist', // or 'eco' / 'favorite' depending on your icon set
  iconColor: 'text-rose-600',
  countLabel: (c) => `Showing: ${c} Rose Arrangements`,
  countBadgeClass: 'text-rose-800 bg-rose-100/80 border-rose-200',
  btnClass:
    'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white hover:shadow-rose-500/25',
  btnLabel: 'Order Bouquet',
  cardHoverClass: 'hover:text-rose-600',
},
  };

  currentConfig = computed(() => {
    const key = this.categoryName();
    return (
      this.categoryMap[key] || {
        bgClass: '',
        breadcrumb: 'Category',
        title: 'Collection',
        description: '',
        icon: 'store',
        iconColor: 'text-gray-700',
        countLabel: (c) => `Items: ${c}`,
        countBadgeClass: 'text-gray-700 bg-gray-100 border-gray-200',
        btnClass: 'bg-slate-900 text-white',
        btnLabel: 'View Item',
        cardHoverClass: 'hover:text-slate-700',
      }
    );
  });
}

// Fragrances List
