import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { DeliveryAddress } from '../../../model/field-model';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-get-details',
  templateUrl: './get-details.component.html',
  styleUrls: ['./get-details.component.css']
})
export class GetDetailsComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  detailsForm: FormGroup;
  submitted = false;
  deliveryAddress = new DeliveryAddress();
  private allDeliveryAddress: any;
  private isShowForm = false;
  private action = 'add';
  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router) { }
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    // Mock data
    this.getDeliveryAddress();
    this.detailsForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      AreaName: ['', Validators.required],
      AddressLine1: ['', Validators.required],
      AddressLine2: [''],
      City: ['', Validators.required],
      PhoneNumber: ['', Validators.required]
    });
  }
  getDeliveryAddress() {
     this.allDeliveryAddress = [
     { id : 1,
       fullName : 'Jane Smith',
    areaName : '123 Maple Street',
    addressLine1 : 'Pretendville',
    addressLine2 : 'NY',
    city : 'city1',
    phoneNumber: '7987987898',
    state: 'state1',
    country: 'country1',
    pinCode   : '12345' , addressType: 'AddressType1'
  } ,
    { id : 2,
      fullName : 'Sham',
    areaName : 'area Street',
    addressLine1 : 'address line1 ',
    addressLine2 : 'address line 2',
    city : 'city2',
    phoneNumber: '54545454545',
    state: 'state2',
    country: 'country2',
    pinCode   : '55545', addressType: 'AddressType2' }
  ];
    if (this.allDeliveryAddress.length === 0) {
      this.isShowForm = true;
    }

  }
  addDeliveryAddressForm() {
    this.action = 'add';
    this.isShowForm = true;
  }
  updateDeliveryAddress(address) {
    this.action = 'update';
    this.isShowForm = true;
    this.deliveryAddress.id = address.id;
    this.deliveryAddress.fullName = address.fullName;
    this.deliveryAddress.areaName = address.areaName;
    this.deliveryAddress.addressLine1 = address.addressLine1;
    this.deliveryAddress.addressLine2 = address.addressLine2;
    this.deliveryAddress.city = address.city;
    this.deliveryAddress.phoneNumber = address.phoneNumber;
    this.deliveryAddress.addressType = address.addressType;
  }
  deleteDeliveryAddress(address) {
      // delete here
      // call delete API
      console.log(this.allDeliveryAddress);
      if (address.id !== 0 ) {
       for (let i = 0; i < this.allDeliveryAddress.length; i++) {
         if (this.allDeliveryAddress[i].id === address.id) {
          delete this.allDeliveryAddress[i];
           $('#ele' + address.id).remove();
         }
     }

}
  }
  get f() {
    return this.detailsForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.detailsForm.invalid) {
      return;
    } else if (!this.detailsForm.invalid) {
      this.deliveryAddress.fullName = this.detailsForm.value.fullName;
      this.deliveryAddress.areaName = this.detailsForm.value.AreaName;
      this.deliveryAddress.addressLine1 = this.detailsForm.value.AddressLine1;
      this.deliveryAddress.addressLine2 = this.detailsForm.value.AddressLine2;
      this.deliveryAddress.city = this.detailsForm.value.City;
      this.deliveryAddress.phoneNumber = this.detailsForm.value.PhoneNumber;
      this.deliveryAddress.addressType = this.detailsForm.value.AddressType;
     
      // move the if else into response success
      if (this.action === 'add') {
        this.deliveryAddress.id = 0;
        this.isShowForm = false;
        this.allDeliveryAddress.push(this.deliveryAddress);
       } else if (this.action === 'update'
             && this.deliveryAddress.id !== 0 ) {
              for (let i = 0; i < this.allDeliveryAddress.length; i++) {
                if (this.allDeliveryAddress[i].id === this.deliveryAddress.id) {
                  this.allDeliveryAddress[i] = this.deliveryAddress;
                  this.isShowForm = false;
                  this.deliveryAddress = new DeliveryAddress();
                }
            }

    }
      const url = 'https://st1.flysddas.com/translations/sasui-upsell/upsell_en.json';
      this.apiService.postData(url, this.deliveryAddress).subscribe((response) => {
        console.log(response);
        console.log('post');
      });
    }
  }

  public proceedToPay(deliveryAddress: any) {
    console.log(deliveryAddress);
    this.router.navigate(['order/pay']);
  }
}
