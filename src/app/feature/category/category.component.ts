import { Component, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';

  interface Perfume {
    id: number;
    name: string;
    brand: string;
    concentration: 'Extrait de Parfum' | 'Eau de Parfum' | 'Eau de Toilette';
    price: number;
    image: string;
    family: string;
    notes: {
      top: string[];
      heart: string[];
      base: string[];
    };
  }

@Component({
  selector: 'app-category',
  imports: [MatIcon,RouterLink],
 standalone:true,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
private route = inject(ActivatedRoute);

  // Category title passed via URL parameter (e.g., /perfumes/Niche%20Fragrances)
  categoryTitle = signal<string>('Luxury Fragrance Collection');

  // Fragrances List
  perfumes = signal<Perfume[]>([
    {
      id: 1,
      name: 'Oud & Amber Elixir',
      brand: 'Oriental Niche',
      concentration: 'Extrait de Parfum',
      price: 480,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500',
      family: 'Woody Oriental',
      notes: {
        top: ['Saffron', 'Bergamot'],
        heart: ['Damask Rose', 'Amber'],
        base: ['Cambodian Oud', 'Cedarwood']
      }
    },
    {
      id: 2,
      name: 'Floral Whisper',
      brand: 'Maison Luxe',
      concentration: 'Eau de Parfum',
      price: 320,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500',
      family: 'Soft Floral',
      notes: {
        top: ['Orange Blossom', 'Pear'],
        heart: ['Jasmine', 'French Lavender'],
        base: ['White Musk', 'Bourbon Vanilla']
      }
    },
    {
      id: 3,
      name: 'Citrus Zest Breeze',
      brand: 'Aqua Notes',
      concentration: 'Eau de Toilette',
      price: 260,
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500',
      family: 'Fresh Citrus',
      notes: {
        top: ['Italian Lemon', 'Grapefruit'],
        heart: ['Spearmint', 'Pink Pepper'],
        base: ['Virginia Cedar', 'Light Amber']
      }
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
