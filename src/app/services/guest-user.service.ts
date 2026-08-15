import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuestUserService {
private readonly STORAGE_KEY = 'app_guest_user_id';
  
  // حفظ الـ ID في Signal لسهولة الاستخدام والتفاعل
  visitorId = signal<string>(this.initVisitorId());

  private initVisitorId(): string {
    let id = localStorage.getItem(this.STORAGE_KEY);
    if (!id) {
      id = 'guest_' + crypto.randomUUID(); // طريقة أحدث وأسرع في المتصفحات الحديثة
      localStorage.setItem(this.STORAGE_KEY, id);
    }
    return id;
  }

  getGuestId(): string {
    return this.visitorId();
  }
}
