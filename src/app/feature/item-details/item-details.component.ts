import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ToasterService } from '../../services/toaster.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { CardCarouselComponent } from '../card-carousel/card-carousel.component';
import { ProductService } from '../../services/product.service';
import { ProductType } from '../../core/models/api';
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from '../admin/admin.component';
import { CartService } from '../../services/cart.service';
import { GuestUserService } from '../../services/guest-user.service';
import { DiscountPercentPipe } from '../../core/pipe/discount-percent.pipe';
import { QtyButtonComponent } from '../qty-button/qty-button.component';
import { finalize } from 'rxjs/operators';
interface Product {
  _id: any;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
  familyOrTheme: string;
  categoryName: string;
  size: string[];
  description: string;
  // Category-Specific Properties
  isSale: boolean;
  salePrice: number;
  quantity: number;
  notes?: { top: string; heart: string; base: string }; // Perfume
  concentration?: string; // Perfume
  dimensions?: string; // Balloon
  heliumReady?: boolean; // Balloon
  colorPalette?: string[]; // Balloon
  boxContents?: string[]; // Gift
  occasion?: string; // Gift
  originalPrice?: number; // Hot Deals
  bundleBreakdown?: { perfume: string; balloon: string; gift: string }; // Hot Deals
  tags: string[];
}

@Component({
  selector: 'app-item-details',
  imports: [
    MatIcon,
    CommonModule,
    DecimalPipe,
    CardCarouselComponent,
    DiscountPercentPipe,
    QtyButtonComponent,
  ],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css',
})
export class ItemDetailsComponent implements OnInit {
  private toastService = inject(ToasterService);
  private productservice = inject(ProductService);
  private cartservice = inject(CartService);
  private guestService = inject(GuestUserService);
  localhost = 'http://localhost:3000';
  private route = inject(ActivatedRoute);
  product = signal<Product>({
    _id: '',
    name: '',
    isSale: false,
    salePrice: 0,
    category: 'perfumes',
    price: 0,
    image: '',
    description: '',
    familyOrTheme: '',
    categoryName: '',
    quantity: 1,
    // Category-Specific Properties
    concentration: '', // Perfume
    dimensions: '', // Balloon
    heliumReady: false, // Balloon
    colorPalette: [], // Balloon
    boxContents: [], // Gift
    occasion: '', // Gift
    bundleBreakdown: { perfume: '', balloon: '', gift: '' }, // Hot Deals
    tags: [],
    size: [''],
  });
  activeImage: string = '';
  selectedSize: string = '';
  quantity: number = 1;

  ngOnInit(): void {
    // تعيين الصورة الأولى والحجم الأول كخيارات افتراضية عند فتح الصفحة
    this.getId();
    this.activeImage = this.product().image[0];
    this.selectedSize = this.product().size[1]; // اختيار 100ml افتراضياً
  }
  getId() {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      const catName = params.get('catName');
      this.getProductDetails(catName as ProductType, productId as string);
    });
  }

  getProductDetails(val: ProductType, productId: string) {
    this.productservice.getProductById(val, productId).subscribe({
      next: (res) => {
        this.activeImage = res.data.image[0];
        this.product.set(res.data as any);
      },
    });
  }

  chooseSize(val: any, productId: string, size: string) {
    console.log(val, productId, size);
    this.productservice
      .updateProduct(val, productId, { size: [size] })
      .subscribe({
        next: (res) => {
          console.log(res);
          // this.product.set(res.data as any);
        },
      });
  }

  spinner: boolean = false;
  handleAddToCart(id: string, catName: any) {
    this.spinner = true;

    this.cartservice
      .addToCart({
        productId: id,
        guestId: this.guestService.getGuestId(),
        quantity: this.quantity,
        productModel: catName,
      })
      // .pipe(
      //   finalize(() => {
      //     // Guarantees the button is re-enabled whether request succeeds or fails
      //     // this.spinner = false;
      //   }),
      // )
      .subscribe((res) => {
        this.spinner = false;
        this.toastService.show(
          'You can view your cart to proceed to checkout.',
          'success',
          5000,
        );
      });
  }

  handleErrorTrigger() {
    // Example alternative fallback error message handling
    this.toastService.show(
      'Failed to apply voucher code. Please try again.',
      'error',
    );
  }
  // بيانات تجريبية للمنتج لمحاكاة متجر العطور الفاخرة

  setActiveImage(imgUrl: string): void {
    this.activeImage = imgUrl;
  }

  // onQuantityChange(itemId: number, newQuantity: number): void {
  //   this.cartItems.update((items) =>
  //     items.map((item) =>
  //       item._id === itemId ? { ...item, quantity: newQuantity } : item
  //     )
  //   );
  // }
}
