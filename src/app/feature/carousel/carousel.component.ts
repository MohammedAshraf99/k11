import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-carousel',
    standalone: true,
    imports: [MatIcon],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  totalSlides = 3;
  autoplayInterval: any;

  ngOnInit() {
    this.startAutoplay();
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  startAutoplay() {
    // Automatically loops slides every 5 seconds
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
  }

  setSlide(index: number) {
    this.currentSlide = index;
    // Reset autoplay timer when a user explicitly clicks on a slide dot indicator
    this.stopAutoplay();
    this.startAutoplay();
  }
}
