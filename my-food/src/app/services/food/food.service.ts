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
      { name: 'All'},
      { name: 'Burgers'},
      { name: 'Pizza'},
      { name: 'Pasta'},
      { name: 'Deserts'},
      
      
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
  deleteFood(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  addFood(food: Food): Observable<Food> {
    return this.http.post<Food>(this.apiUrl, food);
  }
  
  updateFood(food: Food): Observable<Food> {
    return this.http.put<Food>(`${this.apiUrl}/${food.id}`, food);
  }
  
}
