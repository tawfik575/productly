import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.backendService.fetchProducts();
    this.backendService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      }
    });
  }
}