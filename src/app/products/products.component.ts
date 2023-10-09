import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { AdminPanelService } from '../admin-panel/admin-panel.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private adminPanelService: AdminPanelService) { }

  ngOnInit() {
    this.adminPanelService.fetchProducts();
    this.adminPanelService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      }
    });
  }
}