import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LancamentoService } from 'src/app/lancamento/lancamento.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  invalidLogin!: boolean;
  userId : any;
  
  constructor(private router: Router, private http: HttpClient , private userService : UserService, private lancamentoService: LancamentoService) { }

  login(form: NgForm){
    const credentials = {
      'Email' : form.value.Email,
      'Senha' : form.value.Senha
    }

    this.userService.login(credentials).subscribe(response => {
      this.userId = Object.values(response)[Object.values(response).length - 1];
      this.lancamentoService.getUserId(this.userId)
      console.log(this.userId)
      const token = (<any>response).token;
      localStorage.setItem('jwt', token);
      this.invalidLogin = false;
      this.router.navigate(["/"]);    
    }, err => {
      this.invalidLogin = true;
    })      
    
  }

}
