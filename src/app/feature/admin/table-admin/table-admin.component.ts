import {
  Component,
  computed,
  effect,
  inject,
  Input,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { map } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { ProductCategory } from '../admin.component';
import { ModalComponent } from '../modal/modal.component';

export interface AdminProduct {
  _id: any;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
  familyOrTheme: string;
  categoryName: string;
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
  tags: string[];
}

@Component({
  selector: 'tr[app-table-admin]',
  imports: [MatIcon, ModalComponent],
  templateUrl: './table-admin.component.html',
  styleUrl: './table-admin.component.css',
})
export class TableAdminComponent implements OnInit {
  private productService = inject(ProductService);
  localhost = 'http://localhost:3000';
  deleteMessage = output<string>();
  category = input<string | 'all' | undefined>('');
  editModel = output<boolean>();
  product = input<AdminProduct>();
  isModalOpen = signal<boolean>(false);
  isEditMode = signal<boolean>(false);
  activeCategoryFilter = signal<ProductCategory | 'All'>('All');
  searchQuery = signal<string>('');
  categories: ProductCategory[] = ['perfumes', 'balloons', 'gifts', 'deals'];
  formProduct = signal<AdminProduct>(this.getEmptyProduct());
  products = signal<AdminProduct>(this.getEmptyProduct());
  closeModal = signal<boolean>(true);

  ngOnInit(): void {}

  openEditModal(product: AdminProduct) {
    this.formProduct.update(() => ({ ...product }));
    // this.editModel.emit(true);
    this.isModalOpen.set(true);
    // this.allProducts();
  }

  getEmptyProduct(): AdminProduct {
    return {
      _id: Date.now().toString(),
      name: '',
      category: 'perfumes',
      price: 0,
      image:
        'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500',
      familyOrTheme: '',
      concentration: 'Eau de Parfum',
      notes: { top: '', heart: '', base: '' },
      dimensions: '',
      heliumReady: true,
      colorPalette: [],
      boxContents: [],
      occasion: '',
      originalPrice: 0,
      categoryName: '',
      tags: [''],
      bundleBreakdown: { perfume: '', balloon: '', gift: '' },
    };
  }

  deleteProduct(type: any, id: string) {
    let isDeleted = confirm('do you want to delete this product');

    if (isDeleted)
      this.productService
        .deleteProduct(type, id)
        .pipe(map((res) => res.message))
        .subscribe((res) => this.deleteMessage.emit(res as any));
  }

  closeEditModal(){
    this.closeModal.set(false)
  }
}
