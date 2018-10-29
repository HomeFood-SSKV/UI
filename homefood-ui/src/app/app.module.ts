import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/customer/login/login.component';
import { RegisterComponent } from './components/customer/register/register.component';
import { ChefRegisterComponent } from './components/customer/chef-register/chef-register.component';
import { DashboardComponent } from './components/chef/dashboard/dashboard.component';
import { HomeComponent } from './components/order/home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChefRegisterComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
