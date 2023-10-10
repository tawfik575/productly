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

  countProducts: number = 0;
  cartProductsCount = new Subject<number>;

  constructor(private http: HttpClient) { };

  fetchProducts(dest: string) {
    this.http.get<{ products: any[], message: string }>(`http://localhost:3000/api/${dest}`)
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
  }

  getProducts() {
    return this.updatedProducts;
  }

  addProduct(product: Product, dest: string) {
    this.http.post<{ statusId: number, message: string }>(`http://localhost:3000/api/${dest}`, product).subscribe({
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
    this.http.delete<{ message: string }>(`http://localhost:3000/api/${dest}/` + productId).subscribe({
      next: () => {
        const filteredProducts = this.products.filter(product => product.id != productId);
        this.updatedProducts.next([...filteredProducts]);

        this.countProducts--;
        this.cartProductsCount.next(this.countProducts);
      }
    });
  }

  updateProduct(product: Product) {
    this.http.put<{ message: string }>('http://localhost:3000/api/products/' + product.id, product).subscribe({
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