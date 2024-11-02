import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; // Make sure to import BehaviorSubject
import { Cart } from '../../shared/models/cart';
import { Food } from '../../shared/models/food';
import { CartItem } from '../../shared/models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = new Cart();
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cart.items);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(food: Food): void {
    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    
    if (cartItem) {
      this.changeQuantity(food.id, cartItem.quantity + 1);
    } else {
      this.cart.items.push(new CartItem(food));
    }

    // Emit the updated cart items array
    this.cartItemsSubject.next(this.cart.items);
  }

  removeFromCart(foodId: number): void {
    this.cart.items = this.cart.items.filter(item => item.food.id !== foodId);
    
    // Emit the updated cart items array
    this.cartItemsSubject.next(this.cart.items);
  }

  changeQuantity(foodId: number, quantity: number): void {
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    
    if (!cartItem) return;
    
    cartItem.quantity = quantity;

    // Emit the updated cart items array
    this.cartItemsSubject.next(this.cart.items);
  }

  getCart(): Cart {
    return this.cart;
  }
}
