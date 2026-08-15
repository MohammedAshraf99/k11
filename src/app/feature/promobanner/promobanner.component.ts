import { Component, inject, OnInit, signal } from '@angular/core';
import { PromoBanner } from '../../core/models/api';
import { PromoBannerService } from '../../services/promo-banner.service';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-promobanner',
  imports: [RouterLink],
  templateUrl: './promobanner.component.html',
  styleUrl: './promobanner.component.css',
})
export class PromobannerComponent implements OnInit {
  private bannerService = inject(PromoBannerService);
  activeBanner = signal<PromoBanner | null>(null);

  ngOnInit(): void {
    this.bannerService
      .getBanners()
      .pipe(map((res) => res.data))
      .subscribe({
        next: (banners) => {
          console.log(banners);
          this.activeBanner.set(banners[0]);
        },
        error: (err) => console.error('Error loading banner:', err),
      });
  }
}
