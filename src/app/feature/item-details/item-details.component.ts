import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ToasterService } from '../../services/toaster.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { CardCarouselComponent } from '../card-carousel/card-carousel.component';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../core/models/api';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductCategory } from '../admin/admin.component';
import { CartService } from '../../services/cart.service';
import { GuestUserService } from '../../services/guest-user.service';
import { DiscountPercentPipe } from '../../core/pipe/discount-percent.pipe';
import { QtyButtonComponent } from '../qty-button/qty-button.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-item-details',
  imports: [
    MatIcon,
    CommonModule,
    DecimalPipe,
    CardCarouselComponent,
    DiscountPercentPipe,
    RouterLink,
  ],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css',
})
export class ItemDetailsComponent implements OnInit {
  private productservice = inject(ProductService);
  private cartservice = inject(CartService);
  private guestService = inject(GuestUserService);
  localhost = 'http://localhost:3000';
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  product = signal<IProduct>({
    _id: Date.now().toString(),
    name: '',
    isSale: false,
    salePrice: 0,
    category: 'perfumes',
    price: 0,
    image: [''],
    active: true,
    description: '',
    // Category-Specific Properties
    concentration: undefined, // Perfume
    colorPalette: [], // Balloon
    boxContents: [], // Gift
    occasion: '', // Gift
    tags: [],
    size: '',
  });
  activeImage: string = '';
  selectedSize: string = '';
  quantity: number = 1;
  products = signal<IProduct[]>([]);
  ngOnInit(): void {
    // تعيين الصورة الأولى والحجم الأول كخيارات افتراضية عند فتح الصفحة
    this.getId();
    this.activeImage = this.product().image[0];
    this.selectedSize = this.product().size || '50'; // اختيار 100ml افتراضياً
  this.getSaleProduct()
  }
  getId() {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      const catName = params.get('catName');
      this.getProductDetails(productId as string);
    });
  }

  getProductDetails(productId: string) {
    this.productservice.getProductById(productId).subscribe({
      next: (res) => {

        this.activeImage = res.data.image[0];
        this.product.set(res.data as any);
      },
    });
  }

  chooseSize(productId: string, size: string) {
    this.productservice.updateProduct(productId, { size: size }).subscribe({
      next: (res) => {
        // this.product.set(res.data as any);
      },
    });
  }

  spinner: boolean = false;
  handleAddToCart(id: string) {
    this.spinner = true;

    this.cartservice
      .addToCart({
        productId: id,
        guestId: this.guestService.getGuestId(),
        quantity: this.quantity,
      })
      .subscribe(res =>  this.spinner = false);
  }

  setActiveImage(imgUrl: string): void {
    this.activeImage = imgUrl;
  }

 getSaleProduct() {
    this.productService.saleProduct().subscribe((res: any) => {
    this.products.set(res.data);
    });
  }
}
