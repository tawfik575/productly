import { Subject, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './users-section/products/product';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private products: Product[] = [];
  private updatedProducts = new Subject<Product[]>;

  countProducts: number = 0;
  cartProductsCount = new Subject<number>;

  constructor(private http: HttpClient) { };

  fetchProducts(dest: string) {
    this.http.get<{ products: any[], message: string }>(`https://productly-server.vercel.app/api/${dest}`)
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

          if (dest == "cart") {
            this.countProducts = this.products.length;
            this.cartProductsCount.next(this.countProducts);
          }

          this.updatedProducts.next([...this.products]);
        }
      });
  }

  getProducts() {
    return this.updatedProducts;
  }

  addProduct(product: Product, dest: string) {
    this.http.post<{ statusId: number, message: string }>(`https://productly-server.vercel.app/api/${dest}`, product).subscribe({
      next: (submittedData) => {
        if (dest == "products") {
          this.products.push(product);
          this.updatedProducts.next([...this.products]);
        } else {
          if (submittedData.statusId == 201) {
            this.countProducts++;
            this.cartProductsCount.next(this.countProducts);
          }
        }
      }
    });
  }

  deleteProduct(productId: string, dest: string) {
    this.http.delete<{ message: string }>(`https://productly-server.vercel.app/api/${dest}/` + productId).subscribe({
      next: () => {
        this.products = this.products.filter(product => product.id != productId);
        this.updatedProducts.next([...this.products]);

        this.countProducts--;
        this.cartProductsCount.next(this.countProducts);
      }
    });
  }

  updateProduct(product: Product) {
    this.http.put<{ message: string }>('https://productly-server.vercel.app/api/products/' + product.id, product).subscribe({
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