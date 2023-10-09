import { Component, ViewChild, OnInit } from '@angular/core';
import { Product } from 'src/app/products/product';
import { NgForm } from '@angular/forms';
import { AdminPanelService } from '../admin-panel.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['../admin-panel.component.css', './products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  editID: string = "";
  products: Product[] = [];
  newEntry: boolean = false;
  @ViewChild('productInfo') productInfo!: NgForm;

  constructor(private adminPanelService: AdminPanelService) { }

  ngOnInit() {
    this.adminPanelService.fetchProducts();
    this.adminPanelService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      }
    });
  }

  addEntry() {
    this.newEntry = true;
  }

  cancelEntry() {
    this.editID = "";
    this.newEntry = false;
  }

  onEdit(id: string) {
    this.editID = id;
  }

  addProduct() {
    const product: Product = {
      name: this.productInfo.value.name,
      price: +this.productInfo.value.price,
      imageURL: this.productInfo.value.imageURL
    }

    this.newEntry = false;
    this.adminPanelService.addProducts(product);
  }

  onDelete(id: string) {
    this.adminPanelService.deleteProduct(id);
  }

  onUpdate(editedProduct: NgForm) {
    const product: Product = {
      id: this.editID,
      name: editedProduct.value.productName,
      price: +editedProduct.value.productPrice,
      imageURL: editedProduct.value.productImageURL
    }

    this.editID = "";
    this.adminPanelService.updateProduct(product);
  }
}