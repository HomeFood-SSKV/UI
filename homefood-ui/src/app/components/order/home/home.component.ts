import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private cartService: CartService) { }
  public products: any;

  ngOnInit() {
    this.products = [
      {'name': 'Veg meal', 'price':55, 'imgUrl':'', 'quantityAvailable':10},
      {'name': 'Veg briyani', 'price':60, 'imgUrl':'', 'quantityAvailable':10},
      {'name': 'Mutton briyani', 'price':70, 'imgUrl':'', 'quantityAvailable':10}
  ];

  }

  public updateToCart() {
    this.router.navigate(['order/cart']);
  }

  public addProduct(index){
    this.cartService.setCartData(this.products[index]);
  }
}
