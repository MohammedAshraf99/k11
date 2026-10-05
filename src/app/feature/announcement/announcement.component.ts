import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { Announcement } from '../../core/models/api';



@Component({
  selector: 'app-announcement',
  imports: [],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.css'
})
export class AnnouncementComponent {
private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  announcements = signal<Announcement[]>([]);
  isVisible = signal<boolean>(true);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const isClosed = localStorage.getItem('hide_promo_banner');
      if (isClosed === 'true') {
        this.isVisible.set(false);
        return;
      }
      this.fetchAnnouncements();
    }
  }

  fetchAnnouncements(): void {
    this.http.get<{ status: string, data: Announcement[] }>('http://localhost:3000/api/announcements/active')
      .subscribe({
        next: (res) => {
          if (res.data && res.data.length > 0) {
            this.announcements.set(res.data);
          } else {
            this.isVisible.set(false); // إخفاء البانر في حال عدم وجود إعلانات سارية
          }
        },
        error: () => this.isVisible.set(false)
      });
  }

  closeBanner(): void {
    this.isVisible.set(false);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('hide_promo_banner', 'true');
    }
  }
}
