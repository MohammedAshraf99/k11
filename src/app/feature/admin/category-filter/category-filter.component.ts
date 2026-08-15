import {
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ProductCategory } from '../admin.component';
import { ProductService } from '../../../services/product.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-category-filter',
  imports: [MatIcon, FormsModule, RouterLink],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css',
})
export class CategoryFilterComponent implements OnInit {
  private productCount = inject(ProductService);
  activeCategoryFilter = signal<ProductCategory | 'all'>('all');
 specCategory = output<string>()

  categories = signal<{ name: ProductCategory | 'all', count: number }[]>([
    { name: 'all', count: 0 },
  ]);

  ngOnInit(): void {
    this.Count();
  }

  Count() {
    this.productCount.productCount().subscribe((res) => {
      // Ensure we set an array of categories; if service returns a number (or undefined), wrap it
      this.categories.set(res.categoryCount);
    });
  }
}
