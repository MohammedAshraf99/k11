import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-navbar',
    imports: [MatIcon, MatButtonModule, AsyncPipe,RouterLink],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private cartService = inject(CartService);
  isMobileMenuOpen = false;
  isDropdownOpen = false;
  
    ngOnInit(): void {
      this.cartService.cartCount().subscribe()
    }
  
  readonly cartCount =this.cartService.cartCount$

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}

