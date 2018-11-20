import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../../model/field-model';
import { ApiService } from '../../../services/api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  private login: Login;
  unInvalid: boolean ;
  pwdInvalid: boolean;
  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      loginId: ['', [Validators.required]],
      password: ['', [Validators.required]]
  });
  }
  get f() {
    return this.loginForm.controls;
    }
   shake(errorMessage) {
      $('#loginModal .modal-dialog').addClass('shake');
               $('.error').addClass('alert alert-danger').html(errorMessage);
              //  $('input[type="password"]').val('');
              //  this.loginForm.value.password = '';
               setTimeout( function() {
                  $('#loginModal .modal-dialog').removeClass('shake');
      }, 0 );
  }
    onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.loginForm.value.loginId === '') {
        this.unInvalid = true;
      } else if (this.loginForm.value.password === '') {
        this.pwdInvalid = true;
      } else if (this.loginForm.value.loginId !== '') {
        this.unInvalid = false;
      } else if (this.loginForm.value.password !== '') {
        this.pwdInvalid = false;
      }
      if (this.loginForm.invalid) {
        this.unInvalid = false;
        this.pwdInvalid = false;
          return;
      } else if (!this.loginForm.invalid &&  !this.unInvalid &&  !this.pwdInvalid) {
       console.log(this.loginForm.value);
       // build request object and call API
       this.login = new Login();
       this.unInvalid = false;
       this.pwdInvalid = false;
       this.login.loginId = this.loginForm.value.loginId;
       this.login.password = this.loginForm.value.password;
       console.log(this.login);
       const geturl = 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true';
       this.apiService.getData(geturl).subscribe((response) => {
         console.log(response);
         if (response) {
          // Success
          console.log('login success');
         } else {
          // Failure
          console.log('login fails');
          this.shake('Invalid email/password combination');
         }
       });
      }
  }
}
