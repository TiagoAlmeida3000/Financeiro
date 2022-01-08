import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlApi = environment.API

  constructor(private http: HttpClient) { }

  login(credentials : any){
    return this.http.post(this.urlApi + 'user/login', credentials)
  }

  register(credentials : any){
    return this.http.post(this.urlApi + 'user/register', credentials)
  }
}
