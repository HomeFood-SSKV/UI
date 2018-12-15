import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DeliveryAddress, AddressType, DeliveryPoint, Area, City } from '../../../model/field-model';
import { ADDRESS_URL_CONSTANT } from '../../../model/constant-config';
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
  allAddressResponse: any;
  deliveryAddress = new DeliveryAddress();
  addressType: AddressType;
  deliveryPoint: DeliveryPoint;
  area: Area ;
  city: City;
  private allDeliveryAddress: any = [] ;
  filteredArea: any = [] ;
  filteredDeliveryPoint: any = [] ;
  filteredCity: any = [];
  private isShowForm = false;
  private action = 'add';
  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router) { }
  ngOnInit() {
    this.isShowForm = true; //  remove after development
    this.detailsForm = this.formBuilder.group({
      FullName: ['', Validators.required],
      AreaName: ['', Validators.required],
      DeliveryPoint: ['', Validators.required],
      AddressLine1: ['', Validators.required],
      AddressLine2: [''],
      City: ['', Validators.required],
      PinCode: ['', Validators.required],
      PhoneNumber: ['', Validators.required]
    });
    this.filterArea();
    this.filterDeliveryPoint();
    this.filterCity();
    this.getDeliveryAddress();
  }
  filterArea() {
    this.detailsForm.controls.AreaName.valueChanges.subscribe(
      val => {
        this.filteredArea = [];
        if (val.length > 0 ) {
          for (let x = 0 ; x < this.allAddressResponse.area.length; x++) {
            if (this.allAddressResponse.area[x].areaName.toLowerCase().indexOf(val.toLowerCase()) > -1) {
            this.filteredArea.push(this.allAddressResponse.area[x]);
            }
           }
        }
        if (val.length === 0 ) {
          this.filteredArea = this.allAddressResponse.area;
        }
        }
    );
  }
  filterDeliveryPoint() {
    this.detailsForm.controls.DeliveryPoint.valueChanges.subscribe(
      val => {
        this.filteredDeliveryPoint = [];
        if (val.length > 0 ) {
          for (let x = 0 ; x < this.allAddressResponse.deliveryPoint.length; x++) {
            if (this.allAddressResponse.deliveryPoint[x].deliveryPointName.toLowerCase().indexOf(val.toLowerCase()) > -1) {
            this.filteredDeliveryPoint.push(this.allAddressResponse.deliveryPoint[x]);
            }
           }
        }
        if (val.length === 0 ) {
          this.filteredDeliveryPoint = this.allAddressResponse.deliveryPoint;
        }
        }
    );
  }
  filterCity() {
    this.detailsForm.controls.City.valueChanges.subscribe(
      val => {
        this.filteredCity = [];
        if (val.length > 0 ) {
          for (let x = 0 ; x < this.allAddressResponse.city.length; x++) {
            if (this.allAddressResponse.city[x].cityName.toLowerCase().indexOf(val.toLowerCase()) > -1) {
            this.filteredCity.push(this.allAddressResponse.city[x]);
            }
           }
        }
        if (val.length === 0 ) {
          this.filteredCity = this.allAddressResponse.city;
        }
        }
    );
  }
  getSelectedDeliveryPoint(deliveryPoint: DeliveryPoint) {
      this.detailsForm.controls.DeliveryPoint.setValue(deliveryPoint.deliveryPointName);
  }
  getSelectedArea(area: Area) {
    this.detailsForm.controls.AreaName.setValue(area.areaName);
}
getSelectedCity(city: City) {
  this.detailsForm.controls.City.setValue(city.cityName);
}
  getDeliveryAddress() {
    const getAddressUrl = ADDRESS_URL_CONSTANT['GET'];
    this.apiService.getData(getAddressUrl).subscribe((response) => {
      console.log(response);
      this.allAddressResponse = response;
      this.allDeliveryAddress = response.data || [];
      this.addressType = response.addressType || [];
      this.deliveryPoint = response.deliveryPoint || [];
      this.area = response.area || [];
      this.city = response.city || [];
      console.log('post');
    });

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
    this.deliveryAddress.addressId = address.addressId;
    this.deliveryAddress.fullName = address.fullName;
    this.deliveryAddress.area.areaId = address.areaName;
    this.deliveryAddress.addressLine1 = address.addressLine1;
    this.deliveryAddress.addressLine2 = address.addressLine2;
    this.deliveryAddress.city.cityId = address.city;
    this.deliveryAddress.phoneNumber = address.phoneNumber;
    this.deliveryAddress.addressType.addressTypeId = address.addressType;
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
      this.deliveryAddress.area.areaId = this.detailsForm.value.AreaName;
      this.deliveryAddress.addressLine1 = this.detailsForm.value.AddressLine1;
      this.deliveryAddress.addressLine2 = this.detailsForm.value.AddressLine2;
      this.deliveryAddress.city.cityId = this.detailsForm.value.City;
      this.deliveryAddress.phoneNumber = this.detailsForm.value.PhoneNumber;
      this.deliveryAddress.addressType.addressTypeId = this.detailsForm.value.AddressType;

      // move the if else into response success
      if (this.action === 'add') {
        this.deliveryAddress.addressId = 0;
        this.isShowForm = false;
        this.allDeliveryAddress.push(this.deliveryAddress);
       } else if (this.action === 'update'
             && this.deliveryAddress.addressId !== 0 ) {
              for (let i = 0; i < this.allDeliveryAddress.length; i++) {
                if (this.allDeliveryAddress[i].addressId === this.deliveryAddress.addressId) {
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
