import { Component, Input, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { RouterLink } from '@angular/router';
import { ProductCategory } from '../admin/admin.component';
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
  selector: 'app-card-carousel',
  imports: [CardComponent, RouterLink],
  standalone: true,
  templateUrl: './card-carousel.component.html',
  styleUrl: './card-carousel.component.css',
})
export class CardCarouselComponent implements OnInit {
  ngOnInit(): void {}

  @Input() products: AdminProduct[] = [];
  activeCardIndex = 0;
  index: any;
  categoryName: any;
  // دالة عند الضغط على النقطة: تنقل السكرول برفق للكارت المطلوب
  scrollToCard(container: HTMLElement, cardIndex: number) {
    const cardWidth = container.children[0].clientWidth;
    const gap = 16;

    container.scrollTo({
      left: cardIndex * (cardWidth + gap),
      behavior: 'smooth',
    });
    this.activeCardIndex = cardIndex;
  }

  scrollNav(container: HTMLElement, direction: 'left' | 'right'): void {
    const scrollAmount = container.clientWidth; // يحسب عرض 4 منتجات بالكامل مع الفواصل

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }

  // دالة لتحديث النقطة النشطة تلقائياً إذا قام المستخدم بالسحب (Swipe) بإصبعه
  onScroll(container: HTMLElement) {
    const cardWidth = container.children[0].clientWidth;
    const gap = 16;
    const scrollLeft = container.scrollLeft;

    // حساب رقم الكارت بناءً على مسافة السكرول الحالية
    this.activeCardIndex = Math.round(scrollLeft / (cardWidth + gap));
  }
}
