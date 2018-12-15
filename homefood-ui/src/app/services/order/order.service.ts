import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private apiService: ApiService) { }

  private getMealsRequest() {
    const request = 'http://localhost:4200/assets/js/Mock/getMealsResponse.json';
    return request;
  }

  public getAllMeals(): Observable<any> {
    const mealsRequest = this.getMealsRequest();
    return this.apiService.getData(mealsRequest);
  }
}
