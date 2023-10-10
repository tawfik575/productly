import { Component, ViewChild, OnInit } from '@angular/core';
import { Product } from 'src/app/users-section/products/product';
import { NgForm } from '@angular/forms';
import { BackendService } from '../../backend.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['../admin-panel.component.css', './products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  editID: string = "";
  products: Product[] = [];
  newEntry: boolean = false;
  loadSpinner: boolean = true;
  @ViewChild('productInfo') productInfo!: NgForm;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.backendService.fetchProducts("products");
    this.backendService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loadSpinner = false;
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
    this.backendService.addProduct(product, "products");
  }

  onDelete(id: string) {
    this.backendService.deleteProduct(id, "products");
  }

  onUpdate(editedProduct: NgForm) {
    const product: Product = {
      id: this.editID,
      name: editedProduct.value.productName,
      price: +editedProduct.value.productPrice,
      imageURL: editedProduct.value.productImageURL
    }

    this.editID = "";
    this.backendService.updateProduct(product);
  }
}