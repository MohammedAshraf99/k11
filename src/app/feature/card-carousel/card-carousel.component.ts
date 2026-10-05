import { Component, Input, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { IProduct } from '../../core/models/api';

@Component({
  selector: 'app-card-carousel',
  imports: [CardComponent],
  standalone: true,
  templateUrl: './card-carousel.component.html',
  styleUrl: './card-carousel.component.css',
})
export class CardCarouselComponent implements OnInit {
  ngOnInit(): void {}
  @Input() products: IProduct[] = [];
  activeCardIndex = 0;
  index: any;
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
