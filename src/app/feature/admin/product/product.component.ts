import {
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { map } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ToasterService } from '../../../services/toaster.service';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';
import { ModalComponent } from '../modal/modal.component';
import { SearchProductComponent } from '../search-product/search-product.component';
import { TableAdminComponent } from '../table-admin/table-admin.component';
export type ProductCategory = 'perfumes' | 'balloons' | 'gifts' | 'deals';
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
  isSale: boolean;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatIcon,
    FormsModule,
    TableAdminComponent,
    ModalComponent,
    CategoryFilterComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  private productService = inject(ProductService);
  private toasterService = inject(ToasterService);
  categories: ProductCategory[] = ['perfumes', 'balloons', 'gifts', 'deals'];
  activeCategoryFilter = signal<ProductCategory | 'All'>('All');
  searchQuery = signal<string>('');
  products = signal<AdminProduct[]>([]);
  isModalOpen = signal<boolean>(false);
  isEditMode = signal<boolean>(false);

  ngOnInit() {
    this.allProducts('all');
  }

  allProducts(category: string) {
    if (category == 'sale') {
      this.productService
        .saleProduct()
        .pipe(map((res) => (res as any).reverse()))
        .subscribe((data) => {
          this.products.set(data);
        });
    } else {
      this.productService
        .getProducts(category as any)
        .pipe(map((res) => res.data.reverse()))
        .subscribe((data) => {
          console.log(data);
          this.products.set(data as any);
        });
    }
  }
  editProduct(e: any) {
    console.log(e);
  }

  openAddModal() {
    this.isModalOpen.set(true);
  }

  closeModal(e: any) {
    console.log('ds');
    this.isModalOpen.set(false);
  }
  toaster(msg: any) {
    this.toasterService.show(msg);
    this.allProducts('all');
  }

  openEditModal() {
    this.isEditMode.set(true);
    // Deep clone to prevent direct state mutation
    this.isModalOpen.set(true);
  }
}
