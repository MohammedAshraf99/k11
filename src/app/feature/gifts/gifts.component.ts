import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
interface GiftItem {
  id: number;
  title: string;
  occasion: string;
  price: number;
  image: string;
  category:
    | 'Luxury Hamper'
    | 'Personalized'
    | 'Flower & Sweet Combo'
    | 'Corporate';
  customNoteAvailable: boolean;
  boxContents: string[];
}
@Component({
  selector: 'app-gifts',
  standalone: true,
  imports: [RouterLink, MatIcon],
  templateUrl: './gifts.component.html',
  styleUrl: './gifts.component.css',
})
export class GiftsComponent implements OnInit {
  private route = inject(ActivatedRoute);

  // Dynamic Route Title Parameter (e.g., /gifts/Anniversary%20Specials)
  categoryTitle = signal<string>('Curated Gift Hampers');

  // Gift Collection Data Signal
  gifts = signal<GiftItem[]>([
    {
      id: 1,
      title: 'Midnight Celebration Box',
      occasion: 'Anniversary & Birthdays',
      price: 89.00,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500',
      category: 'Luxury Hamper',
      customNoteAvailable: true,
      boxContents: ['Artisanal Chocolates', 'Scented Candle', 'Sparkling Juice']
    },
    {
      id: 2,
      title: 'Personalized Leather Keepsake',
      occasion: 'Corporate & Milestones',
      price: 45.50,
      image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500',
      category: 'Personalized',
      customNoteAvailable: true,
      boxContents: ['Monogrammed Wallet', 'Engraved Pen Set', 'Greeting Card']
    },
    {
      id: 3,
      title: 'Velvet Rose & Macaron Deluxe',
      occasion: 'Romantic Gestures',
      price: 65.00,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500',
      category: 'Flower & Sweet Combo',
      customNoteAvailable: true,
      boxContents: ['12 Red Roses', 'French Macaron Box', 'Ribbon Wrap']
    }
  ]);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const titleParam = params.get('title');
      if (titleParam) {
        this.categoryTitle.set(decodeURIComponent(titleParam));
      }
    });
  }
}