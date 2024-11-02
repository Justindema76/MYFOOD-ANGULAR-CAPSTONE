import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Food } from '../../shared/models/food';
import { Tag } from '../../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private apiUrl = 'http://localhost:3500/foods'; // URL to JSON Server

  constructor(private http: HttpClient) { }

  getFoodById(id: number): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrl}/${id}`)
    ;
  }

  getAllFoodsBySearchTerm(searchTerm: string): Observable<Food[]> {
    return this.http.get<Food[]>(this.apiUrl).pipe(
      map(foods => foods.filter(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  }

  getAllTags(): Tag[] {
    return [
      { name: 'All', count: 14 },
      { name: 'FastFood', count: 4 },
      { name: 'Pizza', count: 2 },
      { name: 'Lunch', count: 3 },
      { name: 'SlowFood', count: 2 },
      { name: 'Hamburger', count: 1 },
      { name: 'Fry', count: 1 },
      { name: 'Soup', count: 1 },
    ];
  }

  getAllFoodsByTag(tag: string): Observable<Food[]> {
    return this.http.get<Food[]>(this.apiUrl).pipe(
      map(foods => tag.toLowerCase() === "all" 
        ? foods 
        : foods.filter(food => food.tags?.includes(tag)))
    );
  }

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(this.apiUrl);
  }
}
