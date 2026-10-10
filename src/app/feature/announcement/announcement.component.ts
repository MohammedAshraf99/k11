import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { Announcement } from '../../core/models/api';
import { AnnouncmentService } from '../../services/announcment.service';



@Component({
  selector: 'app-announcement',
  imports: [],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.css'
})
export class AnnouncementComponent {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private announcement = inject(AnnouncmentService); 
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
this.announcement.getActiveAnnouncements()
      .subscribe({
        next: (res) => {
          if (res.data && res.data.length > 0) {
            this.announcements.set(res.data);
          } else {
            this.isVisible.set(false); 
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
