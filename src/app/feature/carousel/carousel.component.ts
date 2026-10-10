import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Banner } from '../../core/models/api';
import { BannerService } from '../../services/banner.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [MatIcon, RouterLink],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit, OnDestroy {
  private bannerService = inject(BannerService);

  // Signals
  banners = signal<Banner[]>([]);
  isLoading = signal<boolean>(true);
  isSaving = signal<boolean>(false);
  deletingId = signal<string | null>(null);

  // Edit Modal State
  isEditModalOpen = signal<boolean>(false);
  selectedBanner = signal<Banner | null>(null);
  selectedFile: File | null = null;
  currentSlide = 0;
  totalSlides = 3;
  autoplayInterval: any;

  ngOnInit() {
    this.startAutoplay();
    this.fetchBanners();
  }

  fetchBanners(): void {
    this.isLoading.set(true);
    this.bannerService.getBanners().subscribe({
      next: (res) => {
        if (res.success) {
          this.banners.set(res.data);
        }
      },
      error: (err) => console.error('Error fetching banners:', err),
      complete: () => this.isLoading.set(false),
    });
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

  nextSlide(): void {
    const total = this.banners().length;
    if (total <= 1) return; 
    this.currentSlide = (this.currentSlide + 1) % total;
  }

  prevSlide(): void {
    const total = this.banners().length;
    if (total <= 1) return; 
    this.currentSlide = (this.currentSlide - 1 + total) % total;
  }

  setSlide(index: number): void {
    this.currentSlide = index;
  }
}
