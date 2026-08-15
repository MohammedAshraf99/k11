import { Component, inject, OnInit, signal } from '@angular/core';
import { CarouselComponent } from '../../feature/carousel/carousel.component';
import { CardCarouselComponent } from '../../feature/card-carousel/card-carousel.component';
import { InfoItemComponent } from '../../feature/info-item/info-item.component';
import { ProductService } from '../../services/product.service';
import { PromobannerComponent } from "../../feature/promobanner/promobanner.component";
export interface AdminProduct {
  familyOrTheme: string;
  categoryName: string;
  // Category-Specific Properties
  notes?: { top: string; heart: string; base: string }; // Perfume
  dimensions?: string; // Balloon
  heliumReady?: boolean; // Balloon
  _id: number;
  name: string;
  price: number;
  image: string[];
  salePrice?: number;
  // Category-Specific Properties
  concentration?: string; // Perfume
  colorPalette?: string[]; // Balloon
  boxContents?: string[]; // Gift
  occasion?: string; // Gift
  tags?: string[]; // Gift
  isSale: boolean;
  deal: boolean;
  size: string[];
  description: string;
  originalPrice?: number; // Hot Deals
  bundleBreakdown?: { perfume: string; balloon: string; gift: string }; // Hot Deals
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, CardCarouselComponent, InfoItemComponent, PromobannerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  products = signal<AdminProduct[]>([]);
  dealProducts = signal<AdminProduct[]>([]);
  saleProducts = signal<AdminProduct[]>([]);

  ngOnInit() {
    this.getProduct();
    this.getDealProduct();
    this.getSaleProduct();
  }

  getProduct() {
    this.productService.Products().subscribe((res: any) => {
      this.products.set(res.data);
    });
  }

  getDealProduct() {
    this.productService.dealsProduct().subscribe((res: any) => {
      this.dealProducts.set(res.data);
    });
  }

  getSaleProduct() {
    this.productService.saleProduct().subscribe((res: any) => {
      this.saleProducts.set(res);
    });
  }
}
