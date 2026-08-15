import {
  Component,
  inject,
  input,
  Input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ProductCategory } from '../admin.component';
import { ProductType } from '../../../core/models/api';
import { ProductService } from '../../../services/product.service';
export interface AdminProduct {
  familyOrTheme: string;
  // Category-Specific Properties
  notes?: { top: string; heart: string; base: string }; // Perfume
  dimensions?: string; // Balloon
  heliumReady?: boolean; // Balloon
  id: number;
  name: string;
  categoryName: ProductCategory;
  price: number;
  image: string[];
  salePrice?: number;
  // Category-Specific Properties
  concentration?: string; // Perfume
  colorPalette?: string[]; // Balloon
  boxContents?: string[]; // Gift
  occasion?: string; // Gift
  tags?: string[]; // Gift
  isSale: boolean;
  deal: boolean;
  size: string[];
  description: string;
  originalPrice?: number; // Hot Deals
  bundleBreakdown?: { perfume: string; balloon: string; gift: string }; // Hot Deals
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatIcon, FormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  // Outputs & Signals
  close = output<boolean>();
  message = output<string>();
  isEditMode = signal<boolean>(false);
  // Helpers Signals & Properties
  newBoxContent = signal<string>('');
  newColorHex = signal<string>('#f43f5e');
  imagePreviews = signal<string[]>([]);
  categoryName: string = '';
  categories: ProductCategory[] = ['perfumes', 'balloons', 'gifts', 'deals'];
  submitted = false;
  sale: boolean = false;
  deal: boolean = false;
  dealWord = 'add deal?';
  arrOfTags: string[] = [];
  selectedFiles: File[] = [];
  localhost = 'http://localhost:3000';
  products: any;
  productData = input<AdminProduct>();
  closeModall = input<boolean>();
  private productService = inject(ProductService);

  formProduct = linkedSignal<AdminProduct>(() => {
    const data = this.productData();
    return data ? { ...data } : this.getEmptyProduct();
  });

  getEmptyProduct(): AdminProduct {
    return {
      id: Date.now(),
      name: '',
      isSale: false,
      size: [],
      deal: false,
      salePrice: 0,
      categoryName: 'perfumes',
      price: 0,
      description: '',
      image: [],
      tags: [],
      concentration: 'Eau de Parfum',
      colorPalette: [],
      boxContents: [],
      occasion: '',
      originalPrice: 0,
      bundleBreakdown: { perfume: '', balloon: '', gift: '' },
      familyOrTheme: '',
    };
  }

  closeModal() {
    this.close.emit(false);

  }

  // Perfume Sizes Logic
  perfumeSize(event: any) {
    const value = event.target.value;
    let selectedSizes: string[] = [];

    if (value === 'all sizes') {
      selectedSizes = ['50', '100', '200'];
    } else if (value) {
      selectedSizes = [value];
    }

    this.formProduct.update((prod) => ({ ...prod, size: selectedSizes }));
  }

  // Deals & Sale Toggles
  isSale() {
    this.sale = !this.sale;
    this.formProduct.update((admin) => ({ ...admin, isSale: this.sale }));
    return this.sale;
  }

  isDeal() {
    this.deal = !this.deal;
    this.dealWord = this.deal ? 'deal is added' : 'add deal?';
    this.formProduct.update((admin) => ({ ...admin, deal: this.deal }));
    return this.deal;
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

  // Tags Control
  addTag(val: string) {
    const trimmed = val.trim();
    if (!trimmed) return;
    this.arrOfTags.push(trimmed);
    this.formProduct.update((admin) => ({
      ...admin,
      tags: [...this.arrOfTags],
    }));
  }

  // Images Handling & Upload
  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.selectedFiles.push(file);
      formData.append('images', file);

      // إنشاء رابط للمعاينة اللحظية للصور
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.imagePreviews.update((prev) => [
            ...prev,
            e.target!.result as string,
          ]);
        }
      };
      reader.readAsDataURL(file);
    }

    // رفع الصور للباك إند للحصول على الروابط الدائمة
    this.productService.uploadImage(formData).subscribe({
      next: (response) => {
        const uploadedImages = Array.isArray(response.imageUrl)
          ? response.imageUrl
          : [response.imageUrl];

        this.formProduct.update((prod) => ({
          ...prod,
          image: [...(prod.image || []), ...uploadedImages],
        }));
      },
      error: (err) => {
        console.error('حدث خطأ أثناء رفع الصور:', err);
      },
    });

    event.target.value = ''; // إعادة تعيين الحقل لإتاحة اختيار نفس الصور مرة أخرى
  }

  removeImage(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.imagePreviews.update((prev) => prev.filter((_, i) => i !== index));
    this.formProduct.update((prod) => ({
      ...prod,
      image: (prod.image || ['']).filter((_, i) => i !== index),
    }));
  }

  // Form Validation Logic
  validateForm(): boolean {
    const prod = this.formProduct();

    if (
      !prod.categoryName ||
      !prod.name ||
      !prod.description ||
      !prod.price ||
      prod.price <= 0
    ) {
      return false;
    }

    if (
      this.imagePreviews().length === 0 &&
      (!prod.image || prod.image.length === 0)
    ) {
      return false;
    }

    if (this.sale && (!prod.salePrice || prod.salePrice <= 0)) {
      return false;
    }

    if (
      prod.categoryName === 'perfumes' &&
      (!prod.concentration || !prod.size || prod.size.length === 0)
    ) {
      return false;
    }

    if (prod.categoryName === 'gifts' && !prod.occasion) {
      return false;
    }

    if (
      prod.categoryName === 'deals' &&
      (!prod.originalPrice || prod.originalPrice <= 0)
    ) {
      return false;
    }

    return true;
  }

  // Save / Update Actions
  saveProduct() {
    this.submitted = true;

    if (!this.validateForm()) {
      return;
    }

    if (this.isEditMode()) {
      // عملية التعديل مستقبلاً
      this.message.emit('product successfully updated');
    } else {
      this.createProduct();
    }

    this.closeModal();
  }

  createProduct() {
    this.productService
      .createProduct(this.formProduct().categoryName, this.formProduct())
      .subscribe({
        next: (res) => this.message.emit(res.message as string),
        error: (err) => console.error('Error creating product:', err),
      });
  }

}
