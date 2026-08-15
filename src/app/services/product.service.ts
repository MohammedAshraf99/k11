import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  ProductType,
  PerfumeItem,
  BalloonItem,
  GiftItem,
} from '../core/models/api';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl+'/products';

  /**
   * جلب جميع المنتجات حسب النوع (perfumes | balloons | gifts)
   */
  getProducts<T = PerfumeItem | BalloonItem | GiftItem>(
    type: ProductType,
  ): Observable<ApiResponse<T[]>> {
    return this.http.get<ApiResponse<T[]>>(`${this.apiUrl}/${type}`);
  }
  Products<T =any>(): Observable<
    ApiResponse<T[]>
  > {
    return this.http.get<ApiResponse<T[]>>(`${this.apiUrl}/all`);
  }

  /**
   * جلب منتج واحد بالتفصيل عن طريق الـ ID
   */
  getProductById<T = PerfumeItem | BalloonItem | GiftItem>(
    type: ProductType,
    id: string,
  ): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.apiUrl}/${type}/${id}`);
  }

  /**
   * إضافة منتج جديد (Admin)
   */
  createProduct<T>(
    type: ProductType,
    productData: Partial<T>,
  ): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(
      `${this.apiUrl}/${type}`,
      productData,
    );
  }

  /**
   * تعديل بيانات منتج (Admin)
   */
  updateProduct<T>(
    type: ProductType,
    id: string,
    productData: Partial<T>,
  ): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(
      `${this.apiUrl}/${type}/${id}`,
      productData,
    );
  }

  saleProduct<T>(): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.apiUrl}/sale`);
  }

  dealsProduct<T>(): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.apiUrl}/deals`);
  }

    productCount(): Observable<{
  success: boolean;
  categoryCount: {name:any,count:number}[];
}> {
    return this.http.get<{
  success: boolean;
  categoryCount: {name:any,count:number}[];
}>(`${this.apiUrl}/count`);
  }

  /**
   * حذف منتج (Admin)
   */
  deleteProduct(
    type: ProductType,
    id: string | number,
  ): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${type}/${id}`);
  }

  uploadImage(formData: FormData): Observable<{ imageUrl: string }> {
    return this.http.post<any>(`${this.apiUrl}/upload-image`, formData);
  }
}
