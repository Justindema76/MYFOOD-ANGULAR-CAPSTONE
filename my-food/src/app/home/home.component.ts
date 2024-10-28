import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/food';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  formGroup!: FormGroup;
  ratingControl = new FormControl(5);

  constructor(
    private foodService: FoodService, 
    private fb: FormBuilder, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to route params to fetch data based on searchTerm or tag
    this.route.params.subscribe(params => {
      if (params['searchTerm']) {
        this.foods = this.foodService.getAllFoodsBySearchTerm(params['searchTerm']);
      } else if (params['tag']) {
        this.foods = this.foodService.getAllFoodsByTag(params['tag']);
      } else {
        this.foods = this.foodService.getAll();
      }
    });

    // Initialize formGroup with rating control
    this.formGroup = this.fb.group({
      rating: this.ratingControl
    });
  }
}
