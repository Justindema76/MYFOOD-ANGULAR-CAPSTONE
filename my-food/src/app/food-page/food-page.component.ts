import { Component, OnInit } from '@angular/core';
import { Food } from '../shared/models/food';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../services/food/food.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent implements OnInit{
  food!:Food;
  constructor(private activatedRoute:ActivatedRoute, 
    private foodservice: FoodService){
    activatedRoute.params.subscribe((params) => {
      if(params['id'])
        this.food = foodservice.getFoodById(params['id']);
    })
  }
  
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
