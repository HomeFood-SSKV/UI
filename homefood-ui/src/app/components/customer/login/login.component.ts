import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../../model/field-model';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  private login: Login;
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
   shakeModal(){
      $('#loginModal .modal-dialog').addClass('shake');
               $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
               $('input[type="password"]').val('');
               this.loginForm.value.password='';
               setTimeout( function(){ 
                  $('#loginModal .modal-dialog').removeClass('shake'); 
      }, 1000 ); 
  }
    onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      } else if (!this.loginForm.invalid) {
       console.log(this.loginForm.value);
       // build request object and call API
       this.login = new Login();
       this.login.loginId = this.loginForm.value.loginId;
       this.login.password = this.loginForm.value.password;
       console.log(this.login);
       const geturl = 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true';
       this.apiService.getData(geturl).subscribe((response) => {
         console.log(response);
         if(response){
          // Success 
          console.log('login success');
         }else {
          // Failure
          console.log('login fails');
          this.shakeModal();
         }
       });
      }
  }
}
