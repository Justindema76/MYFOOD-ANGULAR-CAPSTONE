import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/food';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  foods: Food[] = [];
  foodForm: Food = this.initializeFoodForm();
  editing: boolean = false;

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.loadFoods();
  }

  loadFoods() {
    this.foodService.getAll().subscribe((data) => {
      this.foods = data;
    });
  }

  initializeFoodForm(): Food {
    return {
      id: 0,
      name: '',
      price: 0,
      tags: [],
      stars: 0,
      imageUrl: '',
      origins: [],
      cookTime: ''
    };
  }

  createNewFood() {
    this.foodForm = this.initializeFoodForm(); // Reset form
    this.editing = false;
  }

  editFood(food: Food) {
    this.foodForm = { ...food }; // Copy the selected food to the form
    this.editing = true;
  }

  saveFood() {
    if (this.editing) {
      this.foodService.updateFood(this.foodForm).subscribe(() => {
        this.loadFoods(); // Reload foods after update
        this.createNewFood(); // Reset form
      });
    } else {
      this.foodService.addFood(this.foodForm).subscribe(() => {
        this.loadFoods(); // Reload foods after addition
        this.createNewFood(); // Reset form
      });
    }
  }

  deleteFood(id: number) {
    this.foodService.deleteFood(id).subscribe(() => {
      this.loadFoods();
    });
  }
}
