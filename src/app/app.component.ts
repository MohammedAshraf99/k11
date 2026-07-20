import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './core/footer/footer.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { CardComponent } from './feature/card/card.component';
import { InfoItemComponent } from './feature/info-item/info-item.component';
import { CarouselComponent } from './feature/carousel/carousel.component';
import { CardCarouselComponent } from "./feature/card-carousel/card-carousel.component";
import { ItemDetailsComponent } from "./feature/item-details/item-details.component";
import { CartComponent } from "./feature/cart/cart.component";
import { ToasterComponent } from "./feature/toaster/toaster.component";
import { CheckoutComponent } from "./feature/checkout/checkout.component";
import { FavProductComponent } from "./feature/fav-product/fav-product.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FooterComponent, NavbarComponent,ToasterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'k11';
}
