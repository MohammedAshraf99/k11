import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
export type ProductCategory = 'Perfumes' | 'Balloons' | 'Gifts' | 'Hot Deals';
export interface AdminProduct {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
  familyOrTheme: string;

  // Category-Specific Properties
  notes?: { top: string; heart: string; base: string }; // Perfume
  concentration?: string; // Perfume
  dimensions?: string; // Balloon
  heliumReady?: boolean; // Balloon
  colorPalette?: string[]; // Balloon
  boxContents?: string[]; // Gift
  occasion?: string; // Gift
  originalPrice?: number; // Hot Deals
  bundleBreakdown?: { perfume: string; balloon: string; gift: string }; // Hot Deals
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatIcon, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  categories: ProductCategory[] = ['Perfumes', 'Balloons', 'Gifts', 'Hot Deals'];
  activeCategoryFilter = signal<ProductCategory | 'All'>('All');
  searchQuery = signal<string>('');

  // Pre-populated items reflecting your exact previous pages
  products = signal<AdminProduct[]>([
    {
      id: 1,
      name: 'Oud & Amber Elixir',
      category: 'Perfumes',
      price: 480,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500',
      familyOrTheme: 'Woody Oriental',
      concentration: 'Extrait de Parfum',
      notes: { top: 'Saffron, Bergamot', heart: 'Damask Rose, Amber', base: 'Cambodian Oud, Cedarwood' }
    },
    {
      id: 2,
      name: 'Pastel Rainbow Arch Kit',
      category: 'Balloons',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500',
      familyOrTheme: 'Balloon Arch',
      dimensions: '12 ft (110 pcs)',
      heliumReady: false,
      colorPalette: ['#f472b6', '#fde047', '#c084fc', '#38bdf8']
    },
    {
      id: 3,
      name: 'Midnight Celebration Box',
      category: 'Gifts',
      price: 89.00,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500',
      familyOrTheme: 'Luxury Hamper',
      occasion: 'Anniversary & Birthdays',
      boxContents: ['Artisanal Chocolates', 'Scented Candle', 'Sparkling Juice']
    },
    {
      id: 4,
      name: 'The Ultimate Romance Combo',
      category: 'Hot Deals',
      price: 150.00,
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500',
      familyOrTheme: '25% OFF Bundle',
      originalPrice: 200.00,
      bundleBreakdown: {
        perfume: 'Floral Whisper EDP',
        balloon: 'Chrome Rose Gold Latex Bouquet',
        gift: 'Velvet Rose & Macaron Deluxe Box'
      }
    }
  ]);

  isModalOpen = signal<boolean>(false);
  isEditMode = signal<boolean>(false);

  // Form State
  formProduct = signal<AdminProduct>(this.getEmptyProduct());

  // Input Helpers for List Inputs (Colors & Contents)
  newBoxContent = signal<string>('');
  newColorHex = signal<string>('#f43f5e');

  filteredProducts = computed(() => {
    const filter = this.activeCategoryFilter();
    const query = this.searchQuery().toLowerCase().trim();

    return this.products().filter((p) => {
      const matchesCategory = filter === 'All' || p.category === filter;
      const matchesSearch = p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  });

  categoryCounts = computed(() => {
    const list = this.products();
    return {
      All: list.length,
      Perfumes: list.filter((p) => p.category === 'Perfumes').length,
      Balloons: list.filter((p) => p.category === 'Balloons').length,
      Gifts: list.filter((p) => p.category === 'Gifts').length,
      'Hot Deals': list.filter((p) => p.category === 'Hot Deals').length
    };
  });

  getEmptyProduct(): AdminProduct {
    return {
      id: Date.now(),
      name: '',
      category: 'Perfumes',
      price: 0,
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500',
      familyOrTheme: '',
      concentration: 'Eau de Parfum',
      notes: { top: '', heart: '', base: '' },
      dimensions: '',
      heliumReady: true,
      colorPalette: [],
      boxContents: [],
      occasion: '',
      originalPrice: 0,
      bundleBreakdown: { perfume: '', balloon: '', gift: '' }
    };
  }

  openAddModal() {
    this.isEditMode.set(false);
    this.formProduct.set(this.getEmptyProduct());
    this.isModalOpen.set(true);
  }

  openEditModal(product: AdminProduct) {
    this.isEditMode.set(true);
    // Deep clone to prevent direct state mutation
    this.formProduct.set(JSON.parse(JSON.stringify(product)));
    this.isModalOpen.set(true);
  }

  // Box Contents List Controls (Gifts)
  addBoxContent() {
    const val = this.newBoxContent().trim();
    if (!val) return;
    const current = this.formProduct();
    const updatedContents = [...(current.boxContents || []), val];
    this.formProduct.set({ ...current, boxContents: updatedContents });
    this.newBoxContent.set('');
  }

  removeBoxContent(index: number) {
    const current = this.formProduct();
    const updated = (current.boxContents || []).filter((_, i) => i !== index);
    this.formProduct.set({ ...current, boxContents: updated });
  }

  // Color Palette Controls (Balloons)
  addColorHex() {
    const hex = this.newColorHex();
    const current = this.formProduct();
    const updatedPalette = [...(current.colorPalette || []), hex];
    this.formProduct.set({ ...current, colorPalette: updatedPalette });
  }

  removeColorHex(index: number) {
    const current = this.formProduct();
    const updated = (current.colorPalette || []).filter((_, i) => i !== index);
    this.formProduct.set({ ...current, colorPalette: updated });
  }

  saveProduct() {
    const current = this.formProduct();
    if (!current.name || current.price <= 0) return;

    if (this.isEditMode()) {
      this.products.update((items) => items.map((p) => (p.id === current.id ? { ...current } : p)));
    } else {
      this.products.update((items) => [current, ...items]);
    }

    this.closeModal();
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.products.update((items) => items.filter((p) => p.id !== id));
    }
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}