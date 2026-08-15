import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl+'/payments';

  createPaypalOrder(amount: number): Observable<{ success: boolean; orderID: string }> {
    return this.http.post<{ success: boolean; orderID: string }>(`${this.apiUrl}/paypal/create-order`, { amount });
  }

  // إرسال orderID مع بيانات الشحن وحساب المستخدم/الزائر
  captureAndCreateOrder(payload: { orderID: string; shippingAddress: any; guestId?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/paypal/capture-and-create-order`, payload);
  }
}