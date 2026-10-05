import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { firstValueFrom, map, tap } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CouponService } from '../../services/coupon.service';
import { environment } from '../../../enviroments/environment';
import { ObjectId } from 'bson';
import { GuestUserService } from '../../services/guest-user.service';
declare var paypal: any;

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paypalRef', { static: false }) paypalElement!: ElementRef;
  private paymentService = inject(PaymentService);
  private cartService = inject(CartService);
  private couponService = inject(CouponService);
  private route = inject(Router);
  isLoading = signal<boolean>(true);
  totalAmount = signal<number>(300);

  ngOnInit(): void {
    this.userExist();
    this.getTotalAmount();
    this.loadPaypalScript()
      .then(() => {
        this.isLoading.set(false);
        setTimeout(() => this.renderPaypalButton(), 100);
      })
      .catch((err) => console.error(' Failed To Load PayPal SDK:', err));
  }
  private GuestUserService = inject(GuestUserService);

  userExist() {
    const userId = JSON.stringify(localStorage.getItem('userId'));
    const isValidUser = ObjectId.isValid(userId);
    if (!isValidUser) {

   
    }
  }
  getTotalAmount() {
    this.cartService
      .getCart()
      .pipe(
        map((res) => {
          if (res.data.coupon) {
            this.couponService
              .validateCoupon(res.data.coupon, res.data.totalPrice)
              .subscribe((res) => {
                this.totalAmount.set(res.data?.finalAmount!);
              });
          } else {
            this.totalAmount.set(res.data.totalPrice);
          }
        }),
      )
      .subscribe();
  }
  // دالة لتحميل السكربت ديناميكياً
  private loadPaypalScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof paypal !== 'undefined') {
        resolve();
        return;
      }
      const script = document.createElement('script');
      // ضع هنا الـ Client ID الخاص بك من بيئة Sandbox
      script.src = `https://www.paypal.com/sdk/js?client-id=${environment.PAYPAL_CLIENT_ID}&currency=GBP`;
      script.onload = () => resolve();
      script.onerror = (err) => reject(err);
      document.body.appendChild(script);
    });
  }

  renderPaypalButton(): void {
    if (!this.paypalElement) return;

    paypal
      .Buttons({
        // 1. إنشاء الطلب
        createOrder: async () => {
          try {
            // تحويل الـ Observable إلى Promise بواسطة firstValueFrom
            const res = await firstValueFrom(
              this.paymentService.createPaypalOrder(this.totalAmount()),
            );
            return res.orderID;
          } catch (err) {
            console.error('خطأ أثناء إنشاء طلب PayPal:', err);
            throw err;
          }
        },
        onApprove: async (data: any) => {
          try {
            // تحويل الـ Observable الخاص بـ captureOrder إلى Promise
            this.paymentService.captureAndCreateOrder(data).subscribe();
            this.cartService.clearCart().subscribe();
            this.route.navigateByUrl('/orders');
            return data.res;
          } catch (err) {
            console.error('Error while Paying Process (Capture):', err);
            throw err;
          }
        },

        onError: (err: any) => {
          console.error('PayPal Button Error:', err);
        },
      })
      .render(this.paypalElement.nativeElement);
  }
}
