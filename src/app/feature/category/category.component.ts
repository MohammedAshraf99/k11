import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductCategory } from '../admin/admin.component';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { DiscountPercentPipe } from '../../core/pipe/discount-percent.pipe';

interface product {
  _id: number;
  name: string;
  categoryName: ProductCategory;
  price: number;
  image: string;
  familyOrTheme: string;
  issale: boolean;
  tags: string[];
  size: string[];
  description: string;
  isSale: boolean;
  salePrice: number;
  // Category-Specific Properties
  notes?: { top: string; heart: string; base: string }; // Perfume
  concentration?: string; // Perfume
  dimensions?: string; // Balloon
  heliumReady?: boolean; // Balloon
  colorPalette?: string[]; // Balloon
  boxContents?: string[]; // Gift
  occasion?: string; // Gift
  originalPrice?: number; // Hot Deals
  bundleBreakdown?: { perfume: string; balloon: string; gift: string }; // Hot Deals
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
  categoryName = signal<ProductCategory>('perfumes');
  // categoryTitle = signal<string>('Luxury Fragrance Collection');
  products = signal<product[]>([]);
  localhost = 'http://localhost:3000';

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const categoryName =
        (params.get('categoryName') as ProductCategory) ?? 'perfumes';
      this.categoryName.set(categoryName);
      this.getProducts(categoryName);
      this.dealProducts(categoryName);
    });
  }

  dealProducts(catName: string) {
    this.categoryName.set(catName as ProductCategory);
    if (catName === 'deals') {
      this.ProductService.dealsProduct<product[]>().subscribe((res) => {
        console.log(res.data);

        for (let i = 0; i < res.data.length; i++) {
          // this.categoryName = res.data[i].category as any;
        }
        this.products.set(res.data as product[]);
      });
    }
  }

  getProducts(categoryName: ProductCategory) {
    if (categoryName !== 'deals') {
      this.ProductService.getProducts<ProductCategory>(categoryName).subscribe(
        (res) => {
          this.products.set(res.data as any[]);
        },
      );
    }
  }
  // Category title passed via URL parameter (e.g., /perfumes/Niche%20Fragrances)

  // Fragrances List
}
