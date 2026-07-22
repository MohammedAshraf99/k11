import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
interface BundleDeal {
  id: number;
  title: string;
  badge: string;
  originalPrice: number;
  dealPrice: number;
  discountPercentage: number;
  image: string;
  items: {
    perfume: string;
    balloon: string;
    gift: string;
  };
}
@Component({
  selector: 'app-deals',
  standalone:true,
  imports: [RouterLink, MatIcon],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.css',
})
export class HotdealsComponent implements OnInit {
  private route = inject(ActivatedRoute);

  // Dynamic Route Title Parameter (e.g., /hot-deals/Anniversary%20Combos)
  categoryTitle = signal<string>('Exclusive Celebration Combos');

  // Hot Deals Data Signal combining Perfumes + Balloons + Gifts
  deals = signal<BundleDeal[]>([
    {
      id: 1,
      title: 'The Ultimate Romance Combo',
      badge: 'Best Seller • 25% OFF',
      originalPrice: 200,
      dealPrice: 150,
      discountPercentage: 25,
      image:
        'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500',
      items: {
        perfume: 'Floral Whisper (Eau de Parfum - 100ml)',
        balloon: 'Chrome Rose Gold Latex Bouquet (12 Pcs)',
        gift: 'Velvet Rose & French Macaron Deluxe Box',
      },
    },
    {
      id: 2,
      title: 'Royal Oud Birthday Bundle',
      badge: 'Limited Time Deal',
      originalPrice: 280,
      dealPrice: 199,
      discountPercentage: 29,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500',
      items: {
        perfume: 'Oud & Amber Elixir (Extrait de Parfum)',
        balloon: 'Giant Metallic Number Foil Balloon (40 Inches)',
        gift: 'Midnight Celebration Box & Artisanal Chocolates',
      },
    },
    {
      id: 3,
      title: 'Fresh Citrus Celebration Set',
      badge: 'Summer Special',
      originalPrice: 160,
      dealPrice: 119,
      discountPercentage: 26,
      image:
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500',
      items: {
        perfume: 'Citrus Zest Breeze (Eau de Toilette)',
        balloon: 'Pastel Rainbow Arch Kit (110 Pcs)',
        gift: 'Personalized Leather Keepsake & Pen Set',
      },
    },
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
