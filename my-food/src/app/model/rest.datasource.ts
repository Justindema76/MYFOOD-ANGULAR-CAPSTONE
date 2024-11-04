import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Food } from "../shared/models/food";
import { Order } from "./order.model";

const PROTOCOL = "http";
const PORT = 3500;

@Injectable()
export class RestDataSource {
    baseUrl: string;
    auth_token?: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    // Fetches list of foods
    getFoods(): Observable<Food[]> {
        return this.http.get<Food[]>(this.baseUrl + "foods"); 
    }

    // Saves an order
    saveOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.baseUrl + "orders", order);
    }

    // Authenticates user and stores token if successful
    authenticate(user: string, pass: string): Observable<boolean> {
        return this.http.post<{ success: boolean; token: string }>(this.baseUrl + "login", {
            name: user,
            password: pass
        }).pipe(
            map(response => {
                this.auth_token = response.success ? response.token : undefined;
                return response.success;
            })
        );
    }
    
    // Saves a food item
    saveFood(food: Food): Observable<Food> {
        return this.http.post<Food>(this.baseUrl + "foods", food, this.getOptions());
    }
    
    // Updates a food item
    updateFood(food: Food): Observable<Food> {
        return this.http.put<Food>(`${this.baseUrl}foods/${food.id}`, food, this.getOptions());
    }
    
    // Deletes a food item
    deleteFood(id: number): Observable<Food> {
        return this.http.delete<Food>(`${this.baseUrl}foods/${id}`, this.getOptions());
    }
    
    // Fetches orders with authentication
    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.baseUrl + "orders", this.getOptions());
    }
    
    // Deletes an order
    deleteOrder(id: number): Observable<Order> {
        return this.http.delete<Order>(`${this.baseUrl}orders/${id}`, this.getOptions());
    }
    
    // Updates an order
    updateOrder(order: Order): Observable<Order> {
        return this.http.put<Order>(`${this.baseUrl}orders/${order.id}`, order, this.getOptions());
    }
    
    // Helper method to create HTTP options with Authorization header
    private getOptions() {
        return {
            headers: new HttpHeaders({
                "Authorization": `Bearer ${this.auth_token}` // Corrected Authorization header
            })
        };
    }
}
