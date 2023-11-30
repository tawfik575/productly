import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../backend.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItems: number = 0;
  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.backendService.fetchProducts("cart");
    this.backendService.cartProductsCount.subscribe({
      next: (len) => {
        this.cartItems = len;
      }
    });
  }
}