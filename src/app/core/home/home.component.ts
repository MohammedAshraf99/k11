import { Component } from '@angular/core';
import { CarouselComponent } from "../../feature/carousel/carousel.component";
import { CardCarouselComponent } from "../../feature/card-carousel/card-carousel.component";
import { InfoItemComponent } from "../../feature/info-item/info-item.component";
import { NotFoundComponent } from "../not-found/not-found.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, CardCarouselComponent, InfoItemComponent, NotFoundComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
