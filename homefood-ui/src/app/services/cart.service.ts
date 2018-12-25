import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OrderRequestModel, FoodDetails } from '../model/order-model';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private subject = new Subject<any>(); 
  public cartData: Array<any> = [];
  public allMeals: any;
  public orderRequest = new OrderRequestModel();
  
  constructor() { }

  public setCartData(food, dateId) {
    let addOrder = true;
    if(this.cartData) {
      this.cartData.forEach((element, index) => {
        if(element.foodId === food.foodId && element.dateId === dateId) {
          element.quantity = food.quantity;
          addOrder = false;
          this.orderRequest.foodDetails[index].quantity = food.quantity;
        } 
        
      });
    }
    if(addOrder) {
      if(!this.orderRequest.foodDetails) {
        this.orderRequest['foodDetails'] = [];
      }
      this.orderRequest.foodDetails.push({
        'foodId' : food.foodId,
        'dateId' : dateId,
        'quantity' : food.quantity,
      });
      this.cartData.push({
        'foodId' : food.foodId,
        'foodName' : food.foodName,
        'dateId' : dateId,
        'quantity' : food.quantity,
        'price' : food.price.price
      });
    }
    this.subject.next(this.cartData);
  }

  public getCartData() {
    return this.subject.asObservable();
  }

  public setCartDataDetails(cartData) {
    this.cartData = cartData;
  }

  public getCardDataDetails() {
    return this.cartData;
  }
}
