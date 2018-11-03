import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
 
import { LoginComponent } from './components/customer/login/login.component';
import { RegisterComponent } from './components/customer/register/register.component';
import { DashboardComponent } from './components/chef/dashboard/dashboard.component';
import { HomeComponent } from './components/order/home/home.component';
import { ForgotpasswordComponent } from './components/customer/forgotpassword/forgotpassword.component';
import { UpdatepasswordComponent } from './components/customer/updatepassword/updatepassword.component';
import { MyProfileComponent } from './components/customer/my-profile/my-profile.component';
import { MyOrdersComponent } from './components/customer/my-orders/my-orders.component';
import { ChefRegisterComponent } from './components/chef/chef-register/chef-register.component';
import { ChefProfileComponent } from './components/chef/chef-profile/chef-profile.component';
import { ChefOrderComponent } from './components/chef/chef-order/chef-order.component';
import { ChefFeedbackComponent } from './components/chef/chef-feedback/chef-feedback.component';
import { ChefInvoiceComponent } from './components/chef/chef-invoice/chef-invoice.component';
import { LocationComponent } from './components/order/location/location.component';
import { ShoppingCartComponent } from './components/order/shopping-cart/shopping-cart.component';
import { GetDetailsComponent } from './components/order/get-details/get-details.component';
import { PaymentSelectionComponent } from './components/order/payment-selection/payment-selection.component';
import { ConfirmationComponent } from './components/order/confirmation/confirmation.component';
import { ComboHomeComponent } from './components/order/combo-home/combo-home.component';
import { LandingPageComponent } from './landing-page/landing-page.component'; 
const appRoutes: Routes = [
  { path: 'home', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'order', component: HomeComponent},
  { path: 'order/cart', component: ShoppingCartComponent },
  { path: 'order/deliverdetails', component: GetDetailsComponent },
  { path: 'order/pay', component: PaymentSelectionComponent },
  { path: 'order/confirmation', component: ConfirmationComponent },
  { path: 'customer/dashboard', component: DashboardComponent },
  { path: 'customer/myprofile', component: MyProfileComponent },
  { path: 'customer/myorders', component: MyOrdersComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
