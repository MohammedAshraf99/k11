import { Component, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, ActivatedRoute } from '@angular/router';



interface BalloonItem {
  id: number;
  name: string;
  theme: string;
  price: number;
  image: string;
  type: 'Latex' | 'Foil / Mylar' | 'Balloon Arch' | 'Giant Number';
  colors: string[]; // Tailwind color classes for preview
  heliumReady: boolean;
  size: string;
}


@Component({
  selector: 'app-balloon',
  standalone:true,
  imports: [RouterLink, MatIcon],
  templateUrl: './balloon.component.html',
  styleUrl: './balloon.component.css'
})
export class BalloonComponent {


  private route = inject(ActivatedRoute);

  // Dynamic Route Title Parameter (e.g., /balloons/Birthday%20Parties)
  categoryTitle = signal<string>('Party Balloon Collection');

  // Balloons Data Signal
  balloons = signal<BalloonItem[]>([
    {
      id: 1,
      name: 'Pastel Rainbow Arch Kit',
      theme: 'Birthday & Baby Shower',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500',
      type: 'Balloon Arch',
      colors: ['bg-pink-300', 'bg-yellow-200', 'bg-purple-300', 'bg-sky-200'],
      heliumReady: false,
      size: '12 ft (110 pcs)'
    },
    {
      id: 2,
      name: 'Metallic Rose Gold Number 0-9',
      theme: 'Milestone Celebrations',
      price: 12.50,
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500',
      type: 'Giant Number',
      colors: ['bg-rose-400', 'bg-amber-300'],
      heliumReady: true,
      size: '40 Inches'
    },
    {
      id: 3,
      name: 'Chrome Latex Bouquet',
      theme: 'Graduation & Glam Events',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500',
      type: 'Latex',
      colors: ['bg-amber-500', 'bg-slate-400', 'bg-sky-400'],
      heliumReady: true,
      size: '12 Inches (Pack of 12)'
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