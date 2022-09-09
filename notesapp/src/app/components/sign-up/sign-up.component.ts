import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


declare var $ : any

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isStyleInvalid : any = {
    'background-color': 'gray',
    'border-color': 'gray'
  };

  isStyleValid : any = {
    'background-color': '#17a2b8',
    'border-color': '#17a2b8'
  };

  isClicked = false;

  responseMsg = "";


  constructor(private _AuthService: AuthService) { }

  ngOnInit(): void {
    $('#sign-up').particleground();
  }

  signUp = new FormGroup({
    "first_name" : new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    "last_name" : new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    "email" : new FormControl('', [Validators.required, Validators.email]),
    "age" : new FormControl('', [Validators.required]),
    "password" : new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)]),
  });

  // password_ex: Power123#

  register(){
    // way to signup
    // let obj = {
    //   first_name: this.signUp.controls.first_name.value,
    //   last_name: this.signUp.controls.last_name.value,
    //   email: this.signUp.controls.email.value,
    //   age: this.signUp.controls.age.value,
    //   password: this.signUp.controls.password.value,
    // };
    // then convert this obj to json and send it by api

    this.isClicked = true;
    this.responseMsg = "";

    // another way to signup
    if(this.signUp.valid){
      this._AuthService.signUp(this.signUp.value).subscribe((response) => {
        if(response.message == "success"){
          this.isClicked = false;
          this.responseMsg = response.message;
          this.signUp.reset();
        }
        else{
          this.isClicked = false;
          this.responseMsg = response.message;
          this.signUp.reset();
        }
        console.log(response);
      });
    }
  }

  /*
  mapower@gmail.com
  Power123#
  */


  myMethod(){
    // particleground(document.getElementById('your-element');
    // $('#sign-up').particleground();
  }

}
