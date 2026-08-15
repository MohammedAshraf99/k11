import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders-history',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './orders-history.component.html',
  styleUrl: './orders-history.component.css',
})
export class OrdersHistoryComponent {

private orderService = inject(OrderService);
  orders = signal<any[]>([]);

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: (res) => {
        if (res.success) {
          this.orders.set(res.data);
        }
      },
      error: (err) => console.error('خطأ في جلب سجل الطلبات:', err)
    });
  }
}
