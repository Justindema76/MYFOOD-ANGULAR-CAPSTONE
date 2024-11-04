// food.repository.ts
import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class FoodRepository {
    private foods: Food[] = [];

    constructor(private dataSource: RestDataSource) {
        dataSource.getFoods().subscribe(data => {
            this.foods = data;
        });
    }

    getFoods(): Food[] {
        return this.foods;
    }

    getFood(id: number): Food | undefined {
        return this.foods.find(f => f.id === id);
    }

    saveFood(food: Food) {
        if (food.id == null || food.id === 0) {
            this.dataSource.saveFood(food)
                .subscribe(f => this.foods.push(f));
        } else {
            this.dataSource.updateFood(food)
                .subscribe(f => {
                    const index = this.foods.findIndex(item => item.id === food.id);
                    if (index > -1) {
                        this.foods.splice(index, 1, food);
                    }
                });
        }
    }

    deleteFood(id: number) {
        this.dataSource.deleteFood(id).subscribe(() => {
            const index = this.foods.findIndex(f => f.id === id);
            if (index > -1) {
                this.foods.splice(index, 1);
            }
        });
    }
}
