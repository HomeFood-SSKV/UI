import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-payment-selection',
  templateUrl: './payment-selection.component.html',
  styleUrls: ['./payment-selection.component.css']
})
export class PaymentSelectionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public proceedToPay() {
    this.router.navigate(['order/confirmation']);
  }

}
