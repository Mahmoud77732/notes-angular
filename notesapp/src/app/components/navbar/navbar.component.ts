import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _AuthService : AuthService, private _Router : Router) {

  }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    this._Router.navigate(['/signin']);
  }

}
