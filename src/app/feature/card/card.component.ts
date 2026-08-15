import { Component, inject, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ToasterService } from '../../services/toaster.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { GuestUserService } from '../../services/guest-user.service';
import { IsNewThisWeekPipe } from '../../core/pipe/is-new-this-week.pipe';
import { DiscountPercentPipe } from '../../core/pipe/discount-percent.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatButtonModule, MatIcon,IsNewThisWeekPipe,DiscountPercentPipe ,CurrencyPipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  private toaster = inject(ToasterService);
  private cartService = inject(CartService);
  private guestService = inject(GuestUserService);
  @Input() product: any;
  localhost = 'http://localhost:3000';

  addToCart(addToCart: string, quantity: number, catName: any): void {
    this.cartService
      .addToCart({
        productId: addToCart,
        guestId: this.guestService.getGuestId(),
        quantity: quantity || 1,
        productModel: catName,
      })
      .subscribe(res => {if(res.success) this.success()});


  }

success(){
        this.toaster.show('Product added to cart!');

}

  addToWishlist(): void {
    this.toaster.show('Product added to wishlist!');
  }
}
