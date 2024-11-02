import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/food';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  foods!: Food[];

  constructor(
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService // Inject CartService
  ) {
    // Subscribe to the route parameters to fetch the food items
    this.activatedRoute.params.subscribe((params) => {
      const searchTerm = params['searchTerm'];
      const tag = params['tag'];

      if (searchTerm) {
        // Fetch foods by search term
        this.foodService.getAllFoodsBySearchTerm(searchTerm).subscribe((foods) => {
          this.foods = foods;
        });
      } else if (tag) {
        // Fetch foods by tag
        this.foodService.getAllFoodsByTag(tag).subscribe((foods) => {
          this.foods = foods;
        });
      } else {
        // Fetch all foods
        this.foodService.getAll().subscribe((foods) => {
          this.foods = foods;
        });
      }
    });
  }

  addToCart(food: Food) { // Pass the food item to add to cart
    this.cartService.addToCart(food); // Add the food item to the cart
  }
}
