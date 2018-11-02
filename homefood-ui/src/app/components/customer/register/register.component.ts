import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from '../../../model/field-model';
import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  private register: Register;
  constructor(private formBuilder: FormBuilder,
   private apiService: ApiService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
   // convenience getter for easy access to form fields
   get f() {
     return this.registerForm.controls;
     }

       onSubmit() {
           this.submitted = true;
           // stop here if form is invalid
           if (this.registerForm.invalid) {
               return;
           } else if (!this.registerForm.invalid) {
            console.log(this.registerForm.value);
            // build request object and call API
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

          const geturl = 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true';
          this.apiService.getData(geturl).subscribe((response) => {
            console.log(response);
            console.log('get');
          });
           }
       }

}
