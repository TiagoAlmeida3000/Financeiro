import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user : any

  ngOnInit(): void {
  }

  constructor(private jwtHelper: JwtHelperService,private router : Router) { }

  get usuario() {
    let usuario_json = localStorage.getItem("name");
    this.user = usuario_json;
    return this.user;
  }


  isUserAuthenticate(){
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }else{
      return false;
    }
  }

  logOut(){
    localStorage.removeItem("jwt");
    localStorage.removeItem("id");
  }

}
