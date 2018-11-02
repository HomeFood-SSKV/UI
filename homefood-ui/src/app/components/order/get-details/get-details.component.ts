import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliveryAddress } from '../../../model/field-model';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-get-details',
  templateUrl: './get-details.component.html',
  styleUrls: ['./get-details.component.css']
})
export class GetDetailsComponent implements OnInit {

  detailsForm: FormGroup;
  submitted = false;
  private deliveryAddress: DeliveryAddress;
  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService) { }

  ngOnInit() {
    this.detailsForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      AreaName: ['', Validators.required],
      AddressLine1: ['', Validators.required],
      AddressLine2: [''],
      City: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      AddressType: ['', Validators.required]
  });
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
       this.deliveryAddress = new DeliveryAddress();
       this.deliveryAddress.fullName = this.detailsForm.value.fullName;
       this.deliveryAddress.areaName = this.detailsForm.value.AreaName;
       this.deliveryAddress.addressLine1 = this.detailsForm.value.AddressLine1;
       this.deliveryAddress.addressLine2 = this.detailsForm.value.AddressLine2;
       this.deliveryAddress.city = this.detailsForm.value.City;
       this.deliveryAddress.phoneNumber = this.detailsForm.value.PhoneNumber;
       this.deliveryAddress.addressType = this.detailsForm.value.AddressType;
       const url = 'https://st1.flysddas.com/translations/sasui-upsell/upsell_en.json';
       this.apiService.postData( url , this.deliveryAddress).subscribe((response) => {
         console.log(response);
         console.log('post');
     });
      }
  }
}
