import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-card-carousel',
    imports: [CardComponent],
    standalone: true,
    templateUrl: './card-carousel.component.html',
    styleUrl: './card-carousel.component.css'
})
export class CardCarouselComponent {
// تتبع رقم الكارت النشط حالياً (يبدأ من 0)
  activeCardIndex = 0;

  // دالة عند الضغط على النقطة: تنقل السكرول برفق للكارت المطلوب
  scrollToCard(container: HTMLElement, cardIndex: number) {
    const cardWidth = container.children[0].clientWidth;
    const gap = 16; // متوافق مع gap-4 في تايلوند (16 بكسل)
    
    container.scrollTo({
      left: cardIndex * (cardWidth + gap),
      behavior: 'smooth'
    });
    this.activeCardIndex = cardIndex;
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
