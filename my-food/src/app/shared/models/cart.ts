import { CartItem } from "./cartItem";

export class Cart {
  clear() {
    throw new Error("Method not implemented.");
  }
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
