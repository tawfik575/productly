import { Injectable } from '@angular/core';
import { Product } from './products/product';
import { HttpClient } from '@angular/common/http';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private products: Product[] = [];
  private updatedProducts = new Subject<Product[]>;

  constructor(private http: HttpClient) { };

  fetchProducts() {
    this.http.get<{ products: any[], message: string }>('http://localhost:3000/api/admin/products')
      .pipe(map(data => {
        return data.products.map(entry => {
          return {
            id: entry._id,
            name: entry.name,
            price: entry.price,
            imageURL: entry.imageURL
          }
        });
      }))
      .subscribe({
        next: (productData) => {
          this.products = productData;
          this.updatedProducts.next([...this.products]);
        }
      });

    return this.products;
  }

  getProducts() {
    return this.updatedProducts;
  }

  addProducts(product: Product) {
    this.http.post<{ message: string }>('http://localhost:3000/api/admin/products', product).subscribe({
      next: () => {
        this.products.push(product);
        this.updatedProducts.next([...this.products]);
      }
    });
  }

  deleteProduct(productId: string) {
    this.http.delete<{ message: string }>('http://localhost:3000/api/admin/products/' + productId).subscribe({
      next: () => {
        const filteredProducts = this.products.filter(product => product.id != productId);
        this.updatedProducts.next([...filteredProducts]);
      }
    });
  }

  updateProduct(product: Product) {
    this.http.put<{ message: string }>('http://localhost:3000/api/admin/products/' + product.id, product).subscribe({
      next: () => {
        const indx = this.products.findIndex(data => {
          return product.id == data.id;
        });

        this.products[indx] = product;
        this.updatedProducts.next([...this.products]);
      }
    });
  }
}