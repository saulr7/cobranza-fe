import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private headers:any;
  private token:string = "";
  
  constructor(
    private http : HttpClient,
    private loginService : LoginService ) 
  { 
    this.token = this.loginService.Token();
    this.headers = new HttpHeaders().set("token", this.token).set("Content-Type", "application/json");
  }


  

  nuevo_email (emailModel)
  {
    var email = emailModel

    return this.http.post(environment.baseURL + "/email/enviar", {email} ,{headers : this.headers}  ).toPromise()
  }



}
