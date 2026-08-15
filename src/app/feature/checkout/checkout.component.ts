import {
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { PaymentService } from '../../services/payment.service';
import { GuestUserService } from '../../services/guest-user.service';

declare var paypal: any;

@Component({
  selector: 'app-checkout',
  imports: [MatIcon],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paypalRef', { static: false }) paypalElement!: ElementRef;
  private paymentService = inject(PaymentService);

  isLoading = signal<boolean>(true);
  totalAmount = 100;

  ngOnInit(): void {
    this.loadPaypalScript().then(() => {
      this.isLoading.set(false);
      // استخدام setTimeout لضمان ثبات عنصر DOM لـ paypalRef بعد انتهاء التمرير
      setTimeout(() => this.renderPaypalButton(), 100);
    }).catch(err => console.error('فشل تحميل PayPal SDK:', err));
  }

  // دالة لتحميل السكربت ديناميكياً
  private loadPaypalScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // إذا كان السكربت محملاً مسبقاً
      if (typeof paypal !== 'undefined') {
        resolve();
        return;
      }

      const script = document.createElement('script');
      // استبدل YOUR_CLIENT_ID برقم العميل الخاص بك
      script.src = 'https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD';
      script.onload = () => resolve();
      script.onerror = (err) => reject(err);
      document.body.appendChild(script);
    });
  }

  renderPaypalButton(): void {
    if (!this.paypalElement) return;

    paypal.Buttons({
      createOrder: () => {
        return new Promise((resolve, reject) => {
          this.paymentService.createPaypalOrder(this.totalAmount).subscribe({
            next: (res) => resolve(res.orderID),
            error: (err) => reject(err)
          });
        });
      },
      onApprove: (data: any) => {
        return new Promise((resolve, reject) => {
          this.paymentService.captureAndCreateOrder(data.orderID).subscribe({
            next: (res) => resolve(res),
            error: (err) => reject(err)
          });
        });
      }
    }).render(this.paypalElement.nativeElement);
  }
}