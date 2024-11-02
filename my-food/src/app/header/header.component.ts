import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../shared/models/cart';
import { CartItem } from '../shared/models/cartItem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cart: Cart = new Cart(); // Initialize cart
  cartItemCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Subscribe to cart items observable
    this.cartService.cartItems$.subscribe(items => {
      this.cart.items = items; // Update cart items
      this.cartItemCount = this.calculateTotalItemCount(items); // Update item count
    });
  }

  private calculateTotalItemCount(items: CartItem[]): number {
    return items.reduce((acc, item) => acc + item.quantity, 0); // Calculate total quantity of items
  }
}
