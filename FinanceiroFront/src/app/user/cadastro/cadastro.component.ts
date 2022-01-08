import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  urlApi = environment.API;
  public mensagem!: string;
  
  constructor(private router: Router, private http: HttpClient, private userService : UserService) { }


  register(form: NgForm){
    const credentials = {
      'Nome' : form.value.Nome,
      'Email' : form.value.Email,
      'Senha' : form.value.Senha
    }

    const pass = {
      'Senha' : form.value.Senha,
      'CSenha' : form.value.CSenha
    }

    if(pass.Senha === pass.CSenha){
      this.mensagem = ""
      
      this.userService.register(credentials).subscribe(response => {
        this.mensagem = "";
        this.router.navigate(["/login"]); 
      }, err => {
        this.mensagem = err.error;
      });
    }else{
      this.mensagem = "Senhas não são iguais"
    }
  }

}
