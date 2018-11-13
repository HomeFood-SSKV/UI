import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';
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
    this.cartService.getCartData().subscribe(message => {
        this.cartData = message;
         console.log(message); 
         this.cartData.forEach(element => {
          console.log(element);
          this.totalPrice = this.totalPrice + element.price;
        });
      });
    this.cartData = this.cartService.getCardDataDetails();  
    this.cartData.forEach(element => {
      console.log(element);
      this.totalPrice = this.totalPrice + element.price;
    });
  }

  public proceedToDetails() {
    this.router.navigate(['order/deliverdetails']);
  }

}
