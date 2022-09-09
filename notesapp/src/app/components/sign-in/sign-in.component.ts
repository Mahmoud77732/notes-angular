import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


declare var $: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {

  isStyleInvalid : any = {
    'background-color': 'gray',
    'border-color': 'gray'
  };

  isStyleValid : any = {
    'background-color': '#17a2b8',
    'border-color': '#17a2b8'
  };

  constructor(private _AuthService : AuthService, private _Router : Router) {
    if(this._AuthService.isLoggedIn()){
      this._Router.navigate(['/profile']);
    }
  }

  ngOnInit(): void {
    // we can create service 'shared on all components' and call this function there and import that service here
    $('#sign-in').particleground();
  }

  signIn = new FormGroup({
    "email" : new FormControl('', [Validators.required, Validators.email]),
    "password" : new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)]),
  });

  login(){
    if(this.signIn.valid){
      this._AuthService.signIn(this.signIn.value).subscribe((response) => {
        if(response.message == "success"){
          this._Router.navigate(['/profile']);
          localStorage.setItem('TOKEN', response.token);
        }
      });
    }
  }

}
