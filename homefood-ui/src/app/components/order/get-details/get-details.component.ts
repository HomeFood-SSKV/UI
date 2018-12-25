import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DeliveryAddress, AddressType, DeliveryPoint, Area, City, Location } from '../../../model/field-model';
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
  isLocationRequired = true;
  isDeliveryPointRequired = false;
  isAddressLine1Required = false;
  isAddressLine2Required = false;
  isPincodeRequired = false;
  isLocationValid = false;
  isDeliveryPointValid = false;
  isAddressLine1Valid = false;
  isAddressLine2Valid = false;
  isPincodeValid = false;
  allAddressResponse: any;
  deliveryAddress = new DeliveryAddress();
  addressType: AddressType;
  deliveryPoint: DeliveryPoint;
  area: Area ;
  city: City;
  location: Location;
  private allDeliveryAddress: any = [] ;
  filteredArea: any = [] ;
  filteredDeliveryPoint: any = [] ;
  filteredCity: any = [];
  supportedLocation: any = [];
  supportedArea: any = [];
  supportedDeliveryPoint: any = [];
  supportedCity: any = [];
  supportedAddressType: any = [];
  private isShowForm = false;
  private action = 'add';
  isShowDeliveryPoint = false;
  isShowOtherAddress = false;
  isFormValid = false;
  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router) { }
  ngOnInit() {
    this.detailsForm = this.formBuilder.group({
      FullName: ['', Validators.required],
      LocationId: ['', Validators.required],
      AreaName: ['', Validators.required],
      DeliveryPoint: [''],
      AddressLine1: [''],
      AddressLine2: [''],
      City: ['Chennai', Validators.required],
      PinCode: [''],
      PhoneNumber: ['', Validators.required]
    });

    this.getDeliveryAddress();
    this.filterArea();
    this.filterDeliveryPoint();
    this.filterCity();
  }
  // location manipulation
  changeLocation() {
    this.resetArea();
    let locId;
    locId = this.detailsForm.value.LocationId;
    if (locId !== '0') {
      this.getSelectedlocation(locId);
      this.isLocationValid = true;
    for (let x = 0 ; x < this.allAddressResponse.area.length; x++) {
      if (this.allAddressResponse.area[x].locationId === locId) {
      this.supportedArea.push(this.allAddressResponse.area[x]);
      }
     }
    } else if (locId === '0') {
      this.isLocationValid = false;
      this.deliveryAddress.location = null;
    }
  }
  getSelectedlocation(locationId: number) {
    for (let x = 0 ; x < this.allAddressResponse.location.length; x++) {
      if (this.allAddressResponse.location[x].locationId === locationId) {
        this.deliveryAddress.location = this.allAddressResponse.location[x];
      }
     }
  }
   // area manipulation
  resetArea() {
    this.detailsForm.controls.AreaName.setValue('');
    this.deliveryAddress.area = null;
    this.supportedArea = [];
    this.filteredArea = [];
    this.detailsForm.controls.DeliveryPoint.setValue('');
    this.deliveryAddress.deliveryPoint = null;
    this.supportedDeliveryPoint = [];
    this.filteredDeliveryPoint = [];
  }
  filterArea() {
    this.detailsForm.controls.AreaName.valueChanges.subscribe(
      val => {
        this.filteredArea = [];
        if (val.length > 0 ) {
          for (let x = 0 ; x < this.supportedArea.length; x++) {
            if (this.supportedArea[x].areaName.toLowerCase().indexOf(val.toLowerCase()) > -1) {
            this.filteredArea.push(this.supportedArea[x]);
            }
           }
        }
        if (val.length === 0 ) {
          this.filteredArea = this.supportedArea;
        }
        }
    );
  }
  focusArea() {
          this.filteredArea = this.supportedArea;
  }
  getSelectedArea(area: Area) {
    this.detailsForm.controls.AreaName.setValue(area.areaName);
    this.deliveryAddress.area = area;
    this.filteredArea = [];
    this.supportedDeliveryPoint = [];
     if (area.areaId) {
    for (let x = 0 ; x < this.allAddressResponse.deliveryPoint.length; x++) {
      if (this.allAddressResponse.deliveryPoint[x].areaId === area.areaId) {
      this.supportedDeliveryPoint.push(this.allAddressResponse.deliveryPoint[x]);
      }
     }
    }
}
 // delivery point manipulation
  filterDeliveryPoint() {
    this.detailsForm.controls.DeliveryPoint.valueChanges.subscribe(
      val => {
        this.filteredDeliveryPoint = [];
        if (val.length > 0 ) {
          for (let x = 0 ; x < this.supportedDeliveryPoint.length; x++) {
            if (this.supportedDeliveryPoint[x].deliveryPointName.toLowerCase().indexOf(val.toLowerCase()) > -1) {
            this.filteredDeliveryPoint.push(this.supportedDeliveryPoint[x]);
            }
           }
        }
        if (val.length === 0 ) {
          this.filteredDeliveryPoint = this.supportedDeliveryPoint;
        }
        }
    );
  }
  getSelectedDeliveryPoint(deliveryPoint: DeliveryPoint) {
    this.detailsForm.controls.DeliveryPoint.setValue(deliveryPoint.deliveryPointName);
    this.deliveryAddress.deliveryPoint = deliveryPoint;
    this.isDeliveryPointValid = true;
    this.filteredDeliveryPoint = [];
}
focusDeliveryPoint() {
  this.filteredDeliveryPoint = this.supportedDeliveryPoint;
}
   // city manipulation
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

getSelectedCity(city: City) {
  this.detailsForm.controls.City.setValue(city.cityName);
  this.deliveryAddress.city = city;
}
// reset form
 cancelAddressForm() {
  this.deliveryAddress = new DeliveryAddress();
  this.detailsForm.controls.FullName.setValue('');
  this.detailsForm.controls.AddressLine1.setValue('');
  this.detailsForm.controls.AddressLine2.setValue('');
  this.detailsForm.controls.PinCode.setValue('');
  this.detailsForm.controls.PhoneNumber.setValue('');
  this.detailsForm.controls.LocationId.setValue('');
  this.detailsForm.controls.AreaName.setValue('');
  this.detailsForm.controls.DeliveryPoint.setValue('');
  this.isShowForm = false;
  this.filteredArea = [];
  this.filteredDeliveryPoint = [];
 }
 // Set Delivery address type
 onAddressTypeSelectionChange(addressType) {
  if (this.supportedAddressType.length > 0) {
    for (let x = 0 ; x < this.supportedAddressType.length; x++) {
      if (addressType.addressTypeId === this.supportedAddressType[x].addressTypeId) {
        addressType.selected = true;
        this.deliveryAddress.addressType = addressType;
        this.supportedAddressType[x].selected = true;
      } else {
        this.supportedAddressType[x].selected = false;
      }
     }
  }
  if (addressType.addressTypeId === '1') {
    this.isShowDeliveryPoint = true;
    this.isShowOtherAddress = false;
    //
    this.isDeliveryPointRequired = true;
    this.isAddressLine1Required = false;
    this.isAddressLine2Required = false;
    this.isPincodeRequired = false;
  } else if (addressType.addressTypeId === '2') {
    this.isShowDeliveryPoint = false;
    this.isShowOtherAddress = true;
    //
    this.isDeliveryPointRequired = false;
    this.isAddressLine1Required = true;
    this.isAddressLine2Required = true;
    this.isPincodeRequired = true;
  }
}
// get address manipulation
  getDeliveryAddress() {
    const getAddressUrl = ADDRESS_URL_CONSTANT['GET'];
    this.apiService.getData(getAddressUrl).subscribe((response) => {
      console.log("response.data", response.data);
      this.allAddressResponse = response;
      this.allDeliveryAddress = response.data || [];
      this.addressType = response.addressType || [];
      this.deliveryPoint = response.deliveryPoint || [];
      this.area = response.area || [];
      this.city = response.city || [];
      this.addLocationDefaultValue(response.location);
      this.deliveryAddress.city = response.city;
      this.supportedCity = response.city;
      this.supportedAddressType = response.addressType || [];
      this.refactorAddressTypeObject();
      if (this.allDeliveryAddress.length === 0) {
        this.isShowForm = true;
      }
      console.log('post');
    });
  }
  displayAllDeliveryDetails(response: any) {

  }
  addLocationDefaultValue(locations: any) {
    const len = locations.length;
    locations[len] = { locationId: '0', locationName : '-- Select --' };
     this.supportedLocation = locations;
     this.detailsForm.controls.LocationId.setValue('0');
  }
  refactorAddressTypeObject() {
    if (this.supportedAddressType.length > 0) {
      for (let x = 0 ; x < this.supportedAddressType.length; x++) {
        if (this.supportedAddressType[x].addressTypeId === '1') {
          this.supportedAddressType[x].selected = true;
          this.deliveryAddress.addressType =  this.supportedAddressType[x];
          this.isShowDeliveryPoint = true;
          this.isShowOtherAddress = false;
          //
          this.isDeliveryPointRequired = true;
          this.isAddressLine1Required = false;
          this.isAddressLine2Required = false;
          this.isPincodeRequired = false;
        } else {
          this.supportedAddressType[x].selected = false;
        }
       }
    }
  }
  addDeliveryAddressForm() {
    this.action = 'add';
    this.isShowForm = true;
  }
  EditDeliveryAddress(address) {
    this.action = 'update';
    this.isShowForm = true;
    // set to form
    this.detailsForm.controls.FullName.setValue(address.fullName);
    this.detailsForm.controls.PhoneNumber.setValue(address.phoneNumber);
    this.detailsForm.controls.LocationId.setValue(address.location.locationId);
    this.detailsForm.controls.AreaName.setValue(address.area.areaName);
    this.onAddressTypeSelectionChange(address.addressType);
    if (address.addressType.addressTypeId === '1') {
      this.detailsForm.controls.DeliveryPoint.setValue(address.deliveryPoint.deliveryPointName);
      this.detailsForm.controls.AddressLine1.setValue('');
      this.detailsForm.controls.AddressLine2.setValue('');
      this.detailsForm.controls.PinCode.setValue('');
    } else  if (address.addressType.addressTypeId === '2') {
      this.detailsForm.controls.AddressLine1.setValue(address.addressLine1);
      this.detailsForm.controls.AddressLine2.setValue(address.addressLine2);
      this.detailsForm.controls.PinCode.setValue(address.pincode);
      this.detailsForm.controls.DeliveryPoint.setValue('');
    }
    this.deliveryAddress = address;
    // this.deliveryAddress.fullName = address.fullName;
    // this.deliveryAddress.addressLine1 = address.addressLine1;
    // this.deliveryAddress.addressLine2 = address.addressLine2;
    // this.deliveryAddress.phoneNumber = address.phoneNumber;
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
   const a = this.validateLocationFields();
   const b = this.validateDeliveryAddressFields();
   const c = this.validateAddressLine1Fields();
   // const d = this.validateAddressLine2Fields();
   const e = this.validatePincodeFields();
   if (this.deliveryAddress.addressType.addressTypeId === '1') {
    if (this.detailsForm.invalid || a === false || b === false)  {
      return;
    } else if (!this.detailsForm.invalid && a && b) {
      this.saveAddress();
    }
  } else if (this.deliveryAddress.addressType.addressTypeId === '2') {
    if (this.detailsForm.invalid || a === false || c === false  || e === false )  {
      return;
    } else if (!this.detailsForm.invalid && a && c && e) {
      this.saveAddress();
    }
  }
  }
  saveAddress() {
    this.deliveryAddress.fullName = this.detailsForm.value.FullName;
    this.deliveryAddress.phoneNumber = this.detailsForm.value.PhoneNumber;
    if (this.deliveryAddress.addressType.addressTypeId === '1') {
      this.deliveryAddress.addressLine1 = null;
      this.deliveryAddress.addressLine2 = null;
      this.deliveryAddress.pincode = null;
    } else if (this.deliveryAddress.addressType.addressTypeId === '2') {
    this.deliveryAddress.addressLine1 = this.detailsForm.value.AddressLine1;
    this.deliveryAddress.addressLine2 = this.detailsForm.value.AddressLine2;
    this.deliveryAddress.pincode = this.detailsForm.value.PinCode;
    this.deliveryAddress.area.areaId = null;
    this.deliveryAddress.area.areaName = null;
    }
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
      this.proceedToPay(null);
      console.log('post');
    });
  }
  validateDeliveryAddressFields() {
    if (this.detailsForm.value.DeliveryPoint !== '') {
      this.isDeliveryPointValid = true;
    } else if (this.detailsForm.value.DeliveryPoint === '') {
      this.isDeliveryPointValid = false;
    }
    return this.isDeliveryPointValid;
  }
  validateLocationFields() {
    if (this.detailsForm.value.LocationId !== '0') {
      this.isLocationValid = true;
    } else if (this.detailsForm.value.LocationId === '0') {
      this.isLocationValid = false;
    }
    return this.isLocationValid;
  }
  validateAddressLine1Fields() {
    if (this.detailsForm.value.AddressLine1 !== '') {
      this.isAddressLine1Valid = true;
    } else if (this.detailsForm.value.AddressLine1 === '') {
      this.isAddressLine1Valid = false;
    }
    return this.isAddressLine1Valid;
  }
  validateAddressLine2Fields() {
    if (this.detailsForm.value.AddressLine2 !== '') {
      this.isAddressLine2Valid = true;
    } else if (this.detailsForm.value.LocationId === '') {
      this.isAddressLine2Valid = false;
    }
    return this.isAddressLine2Valid;
  }
  validatePincodeFields() {
    if (this.detailsForm.value.PinCode !== '') {
      this.isPincodeValid = true;
    } else if (this.detailsForm.value.PinCode === '') {
      this.isPincodeValid = false;
    }
    return this.isPincodeValid;
  }
  public proceedToPay(deliveryAddress: any) {
    console.log(deliveryAddress);
    this.router.navigate(['order/pay']);
  }
}
