import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../../shared/models/cart';
import { Food } from '../../shared/models/food';
import { CartItem } from '../../shared/models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart;

  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    this.cart = new Cart();
    this.cart.items = this.loadCart();
  }

  private loadCart(): CartItem[] {
    const cartJson = localStorage.getItem('cart');
    return cartJson ? JSON.parse(cartJson).items : [];
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  addToCart(food: Food): void {
    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    
    if (cartItem) {
      this.changeQuantity(food.id, cartItem.quantity + 1);
    } else {
      this.cart.items.push(new CartItem(food));
    }

    this.saveCart(); // Save cart to local storage
    this.cartItemsSubject.next(this.cart.items);
  }

  removeFromCart(foodId: number): void {
    this.cart.items = this.cart.items.filter(item => item.food.id !== foodId);
    
    this.saveCart(); // Save cart to local storage
    this.cartItemsSubject.next(this.cart.items);
  }

  changeQuantity(foodId: number, quantity: number): void {
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    
    if (!cartItem) return;
    
    cartItem.quantity = quantity;

    this.saveCart(); // Save cart to local storage
    this.cartItemsSubject.next(this.cart.items);
  }

  getCart(): Cart {
    return this.cart;
  }
  
}
