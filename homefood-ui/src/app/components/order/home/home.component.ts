import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { ApiService } from '../../../services/api.service';
import { OrderService } from '../../../services/order/order.service';
import { MealsModel } from '../../../model/meals-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private cartService: CartService,
    private apiService: ApiService, private orderService: OrderService) { }
  
    public products: any;
    public allMeals = new MealsModel();
    public currentCategory : any;
    public currentDate : any;
    public selectedOptions : any;
    public quantity = [];

  ngOnInit() {
    this.getAllMeals();
    this.selectedOptions = {'currentCategory':'', 'currentDate':''};
  }

  public getAllMeals(){
    this.orderService.getAllMeals().subscribe(
      (mealsReponse:MealsModel) => {
        this.selectedOptions.currentCategory = mealsReponse.supportedCategory[0].categoryId;
        this.selectedOptions.currentDate = mealsReponse.availabilityMapping[0];
        this.allMeals = mealsReponse;
        this.cartService.allMeals = mealsReponse;
        console.log(this.allMeals);
        
      }, error => {
        console.log(error);
      }
    )
  }

  public selectCategory(categoryId){
    this.selectedOptions.currentCategory = categoryId;
    this.currentCategory = categoryId;
  }

  public selectDate(dateId){
    this.currentDate = dateId;
    for(var j in this.allMeals.availabilityMapping) {
      if(this.allMeals.availabilityMapping[j].dateId == dateId) {
        this.selectedOptions.currentDate = this.allMeals.availabilityMapping[j];
      }
    }
  }

  public updateToCart() {
    this.router.navigate(['order/cart']);
  }

  public addProduct(foodData){
    this.cartService.setCartData(foodData, this.selectedOptions.currentDate.dateId);
  }

  public updateQuantity(foodData, type) {
    if(type == '-' && foodData.quantity > 1) {
      foodData.quantity = parseInt(foodData.quantity) - 1;
    } else if(type == '+' && foodData.quantity) {
      foodData.quantity = parseInt(foodData.quantity) + 1;
    }
  }
}
