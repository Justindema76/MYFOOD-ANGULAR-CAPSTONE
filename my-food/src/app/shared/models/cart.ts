import { CartItem } from "./cartItem";

export class Cart {
  items: CartItem[] = [];


  // Getter to calculate total price dynamically
  get totalPrice(): number {
    let totalPrice = 0;
    this.items.forEach(item => {
      totalPrice += item.price * item.quantity; // Multiply price by quantity
    });
    return totalPrice;
  }
}
