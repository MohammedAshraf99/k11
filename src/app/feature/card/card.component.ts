import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ToasterService } from '../../services/toaster.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatButtonModule, MatIcon,RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
 private toaster =  inject(ToasterService);

 addToCart(): void {
    this.toaster.show('Product added to cart!');
  }

   addToWishlist(): void {
    this.toaster.show('Product added to wishlist!');
  }
}
