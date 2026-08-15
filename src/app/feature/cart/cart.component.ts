import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { EmptyComponent } from '../empty/empty.component';
import { CartService } from '../../services/cart.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ProductCategory } from '../admin/admin.component';
import { ToasterComponent } from '../toaster/toaster.component';
import { ToasterService, ToastType } from '../../services/toaster.service';
import { GuestUserService } from '../../services/guest-user.service';
import { QtyButtonComponent } from '../qty-button/qty-button.component';

interface product {
  _id?: number;
  name: string;
  category: ProductCategory;
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
  bundleBreakdown?: { perfume: string; balloon: string; gift: string }; // Hot Deals;
  productModel: 'Balloon' | 'Gift' | 'Perfume';
  quantity: number;
  selectedSize?: string;
}

interface CartItem {
  _id?: number;
  product: product;
  quantity: number;
  productModel: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatIcon, AsyncPipe,QtyButtonComponent,CurrencyPipe, RouterLink, EmptyComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  readonly localhost = 'http://localhost:3000';
  private cartService = inject(CartService);
  private toaster = inject(ToasterService);
  cartItems = signal<CartItem[]>([]);
  spinnerItemId = signal<number | null>(null);
  countSpinner: boolean = false;

  ngOnInit(): void {
    this.getCart();
  }

  spinnerFlapping() {
    this.countSpinner = !this.countSpinner;
  }
  // 1. Reactive state using Writable Signals

  toasterMessage(Msg: string, type: ToastType, duration: number) {
    this.toaster.show(Msg, type, duration);
  }

  getCart() {
    this.cartService.getCart().subscribe((response) => {
      const items =
        (response.data && (response.data as any).items) || response.data || [];
      return this.cartItems.set(items as CartItem[]);
    });
  }

  // 2. High-performance caching using Computed Signals
  readonly subtotal = computed(() =>
    this.cartItems().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    ),
  );

  // 3. Modifying state requires using the built-in .update() method
  onQuantityChange(itemId: number, newQuantity: number): void {
    this.cartItems.update((items) =>
      items.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  removeItem(itemId: number): void {
    let isDeleted = confirm('do you want to delete this product');
    if (!isDeleted) {
      return;
    }
    this.cartService.removeFromCart(itemId as any).subscribe(() => {
      this.toasterMessage('product deleted successfully', 'success', 2);
    });
    this.cartItems.update((items) =>
      items.filter((item) => item._id !== itemId),
    );
  }
}
