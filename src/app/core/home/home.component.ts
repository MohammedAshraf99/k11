import { Component, inject, OnInit, signal } from '@angular/core';
import { CarouselComponent } from '../../feature/carousel/carousel.component';
import { CardCarouselComponent } from '../../feature/card-carousel/card-carousel.component';
import { InfoItemComponent } from '../../feature/info-item/info-item.component';
import { ProductService } from '../../services/product.service';
import { PromobannerComponent } from '../../feature/promobanner/promobanner.component';
import { IProduct } from '../models/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent,
    CardCarouselComponent,
    InfoItemComponent,
    PromobannerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  products = signal<IProduct[]>([]);
  dealProducts = signal<IProduct[]>([]);
  saleProducts = signal<IProduct[]>([]);

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
    this.saleProducts.set(res.data);
    });
  }
}
