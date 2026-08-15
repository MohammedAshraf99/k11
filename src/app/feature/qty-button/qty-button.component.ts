import { Component, inject, input, output, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { MatIcon } from "@angular/material/icon";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-qty-button',
  imports: [MatIcon,CurrencyPipe],
  templateUrl: './qty-button.component.html',
  styleUrl: './qty-button.component.css'
})
export class QtyButtonComponent {
private cartService = inject(CartService);

  // Inputs using Angular Signals API
  itemId = input.required<any>();
  quantity = input.required<number>();
  unitPrice = input.required<number>();

  // Output event to notify parent component to refresh or update state
  quantityUpdated = output<number>();

  // Local state for this component instance only
  isLoading = signal<boolean>(false);

  increaseQty(): void {
    const newCount = this.quantity() + 1;
    this.updateQuantity(newCount, 'Product modified successfully');
  }

  decreaseQty(): void {
    if (this.quantity() <= 1) {
      // Return early and notify user
      return;
    }
    const newCount = this.quantity() - 1;
    this.updateQuantity(newCount, 'Product modified successfully');
  }

  private updateQuantity(newCount: number, successMsg: string): void {
    this.isLoading.set(true);

    this.cartService.updateCartItemQuantity(this.itemId(), newCount).subscribe({
      next: (res) => {
        if (res.success) {
          this.quantityUpdated.emit(newCount);
        }
      },
      error: (err) => {
        console.error('Failed to update quantity', err);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
