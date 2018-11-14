import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private subject = new Subject<any>(); 

  constructor() { }

  public cartData: Array<any> = [];

  public setCartData(data) {
    this.cartData.push(data);
    this.subject.next(this.cartData);
  }

  public getCartData() {
    return this.subject.asObservable();
  }

  public getCardDataDetails() {
    return this.cartData;
  }
}
