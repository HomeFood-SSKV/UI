import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { Register } from '../../../model/field-model';
import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public submitted = false;
  private register: Register;
  private fnamePattern = '^[a-zA-Z._-]{0,100}$';
  private mobilePattern = '^[0-9_-]{10,10}$';
  //private emailPattern = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
  private passwordPattern = '^[a-zA-Z._-]{0,10}$';
  private isFirstNameValid = true;
  private isEmailIdValid = true;
  private isMobileNumberValid = true;
  private isPasswordValid = true;
  private isPasswordNotMatch;
  constructor(private formBuilder: FormBuilder,
   private apiService: ApiService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(100),
        Validators.pattern(this.fnamePattern)]],
      PhoneNumber: ['', [Validators.required, Validators.maxLength(10),
        Validators.pattern(this.mobilePattern)]],
      email: ['', [Validators.maxLength(100), Validators.email
        ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]]

  });
  }
   // convenience getter for easy access to form fields
   get _register() {
     return this.registerForm.controls;
     }
     OnBlur(fieldName: string, field: any) {
      switch (fieldName) {
            case 'firstname':
            const fnPat = new RegExp(this.fnamePattern);
            this.isFirstNameValid = fnPat.test(field.value);
            console.log(this.isFirstNameValid);
            break;
            case 'mobilenumber':
            const mbPat = new RegExp(this.mobilePattern);
            this.isMobileNumberValid = mbPat.test(field.value);
            console.log(this.isMobileNumberValid);
            break;
    }
     }
       onSubmit() {
           this.submitted = true;
           if (this.registerForm.invalid) {
            if ( this.registerForm.value.password
              && this.registerForm.value.password_confirmation
              && this.registerForm.value.password.length > 0
              && this.registerForm.value.password_confirmation.length > 0
              && this.registerForm.value.password !==  this.registerForm.value.password_confirmation) {
              this.isPasswordNotMatch = true;
           }
               return;
           } else if (!this.registerForm.invalid) {
            if ( this.registerForm.value.password
              && this.registerForm.value.password_confirmation
              && this.registerForm.value.password.length > 0
              && this.registerForm.value.password_confirmation.length > 0
              && this.registerForm.value.password !==  this.registerForm.value.password_confirmation) {
              this.isPasswordNotMatch = true;
           } else {
              this.isPasswordNotMatch = false;
            this.register = new Register();
            this.register.fullName = this.registerForm.value.firstName;
            this.register.phoneNumber = this.registerForm.value.phoneNumber;
            this.register.emailId = this.registerForm.value.email;
            this.register.password = this.registerForm.value.password;
            console.log(this.register);
            const url = 'https://st1.flysddas.com/translations/sasui-upsell/upsell_en.json';
            this.apiService.postData( url , this.register).subscribe((response) => {
              console.log(response);
              console.log('post');
          });
        }
           }
       }

}
