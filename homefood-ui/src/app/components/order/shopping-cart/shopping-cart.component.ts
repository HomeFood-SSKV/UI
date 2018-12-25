import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  public cartData: Array<any> = [];
  public totalPrice: any = 0;
  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.cartService.orderRequest.userId = 1;
    this.cartService.getCartData().subscribe(message => {
      this.cartData = message;
      this.updateTotalPrice();
    });
    this.cartData = this.cartService.getCardDataDetails();
    
  }

  public proceedToDetails() {
    console.log(this.cartService.orderRequest);
    this.router.navigate(['order/deliverdetails']);
  }

  public updateTotalPrice() {
    this.totalPrice = 0;
    this.cartData.forEach(element => {
      this.totalPrice = this.totalPrice + (parseFloat(element.quantity) * parseFloat(element.price));
    });
  }
  public removeMeal(index){
    console.log(index);
    this.cartData.splice(index, 1);
    this.cartService.orderRequest.foodDetails.splice(index, 1);
    this.cartService.setCartDataDetails(this.cartData);
    this.updateTotalPrice();
  }

}
