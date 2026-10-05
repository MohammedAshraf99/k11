import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe, NgClass } from '@angular/common';
import { QtyButtonComponent } from '../qty-button/qty-button.component';
import { IProduct } from '../../core/models/api';
import { environment } from '../../../enviroments/environment';
import { CouponService } from '../../services/coupon.service';
import { ToasterService } from '../../services/toaster.service';
import { UserModalComponent } from '../../core/user-modal/user-modal.component';
import { GuestUserService } from '../../services/guest-user.service';
import { ObjectId } from 'bson';

interface CartItem {
  _id?: string;
  product: IProduct;
  quantity: number;
  productModel: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatIcon,
    QtyButtonComponent,
    CurrencyPipe,
    RouterLink,
    NgClass,
    UserModalComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  readonly localhost = environment.baseUrl;
  private cartService = inject(CartService);
  private coupon = inject(CouponService);
  private toasterService = inject(ToasterService);
  private GuestUserService = inject(GuestUserService);
  private router = inject(Router);
  open = input<boolean>(false);
  savedUser = signal<any | null>(null);
  isModalOpen = signal<boolean>(false);
  cartItems = signal<CartItem[]>([]);
  spinnerItemId = signal<number | null>(null);
  countSpinner: boolean = false;
  activeCoupon = signal<boolean | null>(null);
  finalAmount = signal<number | null>(null);
  isCoupon = signal<string>('');

  ngOnInit(): void {
    this.getCart();
    this.checkActive();
  }
  spinnerFlapping() {
    this.countSpinner = !this.countSpinner;
  }
  userExist() {
    const userId = this.GuestUserService.getGuestId();
    const isValidUser = ObjectId.isValid(userId);
     if (isValidUser) {
          this.isModalOpen.set(false);
          this.router.navigate(['/checkout']);

    } else {
          this.isModalOpen.set(true);
    }
  }
  onUserSave(data: any): void {
    console.log('Received data in parent:', data);
    this.savedUser.set(data);
  }
  closeUserModal() {
    throw new Error('Method not implemented.');
  }

  getCart() {
    this.cartService.getCart().subscribe((response) => {
      this.isCoupon.set(response.data.coupon);
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
  onQuantityChange(itemId: string, newQuantity: number): void {
    this.finalAmount.set(null);
    this.cartItems.update((items) =>
      items.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  }

  removeItem(itemId: string): void {
    let isDeleted = confirm('do you want to delete this product');
    if (!isDeleted) {
      return;
    }
    this.cartService.removeFromCart(itemId as any).subscribe();
    this.cartItems.update((items) =>
      items.filter((item) => item._id !== itemId),
    );
  }

  checkCoupon(coupon: string, TotalAmount: number) {
    this.coupon.validateCoupon(coupon, TotalAmount).subscribe((res) => {
      if (res.data?.finalAmount!) {
        this.toasterService.show('Coupon Applied Successfully', 'success');
        this.finalAmount.set(res.data?.finalAmount!);
        this.cartService.updateCartCoupon(coupon).subscribe();
      }
    });
  }

  checkActive() {
    this.coupon.getActivePromo().subscribe((res) => {
      this.activeCoupon.set(res.data[0].isActive);
    });
  }
}
