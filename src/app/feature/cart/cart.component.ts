import { Component, computed, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { EmptyComponent } from "../empty/empty.component";

interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  selectedSize: string;
  image: string;
}

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [MatIcon, RouterLink, EmptyComponent],
  templateUrl: './cart.component.html',
    styleUrl: './cart.component.css'
})
export class CartComponent {
// 1. Reactive state using Writable Signals
  readonly cartItems = signal<CartItem[]>([
    {
      id: 1,
      name: 'Royal Oud Intense',
      brand: 'Arabian Luxury',
      price: 185.00,
      quantity: 1,
      selectedSize: '100ml',
      image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      name: 'Pure White Musk',
      brand: 'Oud Shop Originals',
      price: 95.00,
      quantity: 2,
      selectedSize: '50ml',
      image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=300&q=80'
    }
  ]);

  // 2. High-performance caching using Computed Signals
  readonly subtotal = computed(() => 
    this.cartItems().reduce((total, item) => total + (item.price * item.quantity), 0)
  );

  // 3. Modifying state requires using the built-in .update() method
  increaseQty(itemId: number): void {
    this.cartItems.update(items =>
      items.map(item => item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item)
    );
  }

  decreaseQty(itemId: number): void {
    this.cartItems.update(items =>
      items.map(item => 
        item.id === itemId && item.quantity > 1 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  }

  removeItem(itemId: number): void {
    this.cartItems.update(items => items.filter(item => item.id !== itemId));
  }
}
