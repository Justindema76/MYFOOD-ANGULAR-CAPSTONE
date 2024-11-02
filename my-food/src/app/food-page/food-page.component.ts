// food-page.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent {
  food!: Food;

  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) {
    // Directly subscribe to route parameters and fetch food
    this.activatedRoute.params.subscribe((params) => {
      const foodId = params['id'];
      if (foodId) {
        // Subscribe to the observable to get the food object
        this.foodService.getFoodById(foodId).subscribe((food) => {
          this.food = food;
        },
        (error) => {
          console.error('Error fetching food item:', error);
          // Handle the error appropriately (e.g., show a message to the user)
        }
      );
      }
    });
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
