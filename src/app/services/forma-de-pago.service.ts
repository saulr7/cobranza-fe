import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { IFormaPago } from '../models/formaDePago';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FormaDePagoService {
  
  private headers:any;
  private token:string = "";
  constructor(
    private http : HttpClient,
    private loginService : LoginService
  ) { 
    this.token = this.loginService.Token();
    this.headers = new HttpHeaders().set("token", this.token).set("Content-Type", "application/json");
  }

  
  mostrar_todas()
  {
    return this.http. get<IFormaPago[]>(environment.baseURL + "/formaPago/all", {headers : this.headers}  ).toPromise()
  }

  cambiar_estado(formaDePago)
  {
    var formaPagoModel = formaDePago
    return this.http.post(environment.baseURL + "/formaPago/update", { formaPagoModel } , {headers : this.headers}  ).toPromise()
  }

   nueva_formaDePago(formaDePago)
   {
     var formaPagoModel = formaDePago
    return this.http.post(environment.baseURL + "/formaPago/new", { formaPagoModel } , {headers : this.headers}  ).toPromise()
   }

}
