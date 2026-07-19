import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ToasterService } from '../../services/toaster.service';
import { CommonModule } from '@angular/common';
import { CardCarouselComponent } from "../card-carousel/card-carousel.component";

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [MatIcon, CommonModule, CardCarouselComponent],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css',
})
export class ItemDetailsComponent implements OnInit {
  private toastService = inject(ToasterService);

  handleAddToCart() {
    // 1. Process your backend cart logic here...

    // 2. Fire immediate success feedback to the screen viewport
    // this.toastService.show('Royal Oud Intense successfully added to cart!', 'success');
    this.toastService.show(
      'You can view your cart to proceed to checkout.',
      'success',
      5000,
    );
  }

  handleErrorTrigger() {
    // Example alternative fallback error message handling
    this.toastService.show(
      'Failed to apply voucher code. Please try again.',
      'error',
    );
  }
  // بيانات تجريبية للمنتج لمحاكاة متجر العطور الفاخرة
  product = {
    name: 'Royal Oud Intense',
    brand: 'Arabian Luxury',
    type: 'Eau de Parfum',
    price: 185.0,
    oldPrice: 220.0,
    discount: 15,
    rating: 4.9,
    reviewsCount: 124,
    description:
      'A majestic blend of precious Cambodian Oud, velvety dark rose, and warm golden amber. Royal Oud Intense delivers a captivating, long-lasting sensory trail crafted for those who command sophistication and timeless heritage.',
    notes: ['Cambodian Oud', 'Damask Rose', 'Amber', 'Patchouli', 'White Musk'],
    sizes: ['50ml', '100ml', '200ml'],
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
    ],
  };

  activeImage: string = '';
  selectedSize: string = '';
  quantity: number = 1;

  ngOnInit(): void {
    // تعيين الصورة الأولى والحجم الأول كخيارات افتراضية عند فتح الصفحة
    this.activeImage = this.product.images[0];
    this.selectedSize = this.product.sizes[1]; // اختيار 100ml افتراضياً
  }

  setActiveImage(imgUrl: string): void {
    this.activeImage = imgUrl;
  }

  increaseQty(): void {
    this.quantity++;
  }

  decreaseQty(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
