import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CouponService } from '../../services/coupon.service';
import { Coupon } from '../../core/models/api';

@Component({
  selector: 'app-coupon-model',
  imports: [],
  templateUrl: './coupon-model.component.html',
  styleUrl: './coupon-model.component.css',
})
export class CouponModelComponent {
  private router = inject(Router);
  private couponServices = inject(CouponService);
  coupon = signal<Coupon | null>(null);
  isOpen = signal<boolean>(false);
  promoCode = signal<string>('WELCOME20');
  isCopied = signal<boolean>(false);
  code = signal<string | undefined>(undefined);
  ngOnInit(): void {
    this.getCoupon();
  }

  getCoupon() {
    this.couponServices.getAllCoupons().subscribe((res) => {
      if (!res.count) {
        return;
      }
      if (!res.data[0].isValid) {
        return;
      }
      this.coupon.set(res.data[0]);
      this.code.set(res.data[0].code);
      this.checkVisibility();
    });
  }
  private checkVisibility(): void {
    const hasSeenPromo = localStorage.getItem('hasSeenPromoModal');
    if (!hasSeenPromo) {
      // Delay popup by 1 second for optimal UX after page render
      setTimeout(() => {
        this.isOpen.set(true);
      }, 2000);

    
    }
  }

  copyCode(): void {
    navigator.clipboard.writeText(this.code()!);
    this.isCopied.set(true);
    setTimeout(() => this.isCopied.set(false), 2500);
  }

  shopNow(): void {
    this.copyCode();
    this.closeModal();
    this.router.navigate(['/home']);
  }

  closeModal(): void {
    this.isOpen.set(false);
    localStorage.setItem('hasSeenPromoModal', 'true');
  }
}
