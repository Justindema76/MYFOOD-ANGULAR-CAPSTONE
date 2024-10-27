import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/food';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  formGroup!: FormGroup;
  ratingControl = new FormControl(3)

  constructor(private foodService: FoodService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.foods = this.foodService.getAll();

    // Initialize formGroup
    this.formGroup = this.fb.group({
      value: new FormControl(null) // Initialize with a default value if needed
    });
  }
}
