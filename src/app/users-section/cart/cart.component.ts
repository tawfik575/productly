import { Component, OnInit } from '@angular/core';
import { Product } from '../products/product';
import { BackendService } from '../../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  discount: number = 15;
  totalAmount: number = 0;
  products: Product[] = [];
  basePrices: number[] = [];
  loadSpinner: boolean = true;
  quantities: number[] = [1, 2, 3, 4, 5];

  constructor(private backendService: BackendService, private router: Router) { }

  ngOnInit() {
    this.backendService.fetchProducts("cart");
    this.backendService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loadSpinner = false;
        this.storeBasePrices();
        this.calculateTotalAmount();
      }
    });
  }

  private storeBasePrices() {
    let prices: number[] = [];

    for (const product of this.products) {
      prices.push(product.price);
    }

    this.basePrices = prices;
  }

  private calculateTotalAmount() {
    let amount = 0;

    for (const product of this.products) {
      amount += product.price;
    }

    this.totalAmount = +(amount - this.discount).toFixed(2);

    if (this.totalAmount < 0) {
      this.totalAmount = 0;
    }
  }

  onValueChange(event: any, id: string) {
    const quantity = event.target.value;

    const indx = this.products.findIndex(product => {
      return product.id == id;
    });

    this.products[indx].price = +(this.basePrices[indx] * quantity).toFixed(2);
    this.calculateTotalAmount();
  }

  removeProduct(id: string) {
    this.backendService.deleteProduct(id, "cart");

    const indx = this.products.findIndex(product => {
      return product.id == id;
    });

    this.products.splice(indx, 1);
    this.basePrices.splice(indx, 1);
  }

  onClick() {
    this.router.navigate(['']);
  }
}