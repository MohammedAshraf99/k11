import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-info-item',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './info-item.component.html',
  styleUrl: './info-item.component.css'
})
export class InfoItemComponent {

  currentActiveCard = 0;

  // دالة عند الضغط على النقطة: تقوم بتحريك السكرول للبطاقة المطلوبة
  scrollToCard(container: HTMLElement, cardIndex: number) {
    const cardWidth = container.children[0].clientWidth;
    const gap = 24; // مسافة الـ gap بين العناصر بحسب كلاس Tailwind
    
    container.scrollTo({
      left: cardIndex * (cardWidth + gap),
      behavior: 'smooth'
    });
    this.currentActiveCard = cardIndex;
  }

  // دالة لتحديث النقطة النشطة تلقائياً إذا قام المستخدم بالسحب بإصبعه (Swipe)
  onScroll(container: HTMLElement) {
    const cardWidth = container.children[0].clientWidth;
    const gap = 24;
    const scrollLeft = container.scrollLeft;
    
    // حساب البطاقة الحالية بناءً على مسافة السكرول
    this.currentActiveCard = Math.round(scrollLeft / (cardWidth + gap));
  }
}

