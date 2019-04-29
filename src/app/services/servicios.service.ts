import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment.prod';
import { IServicio } from '../models/servicioModel';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private headers:any;
  private token:string = "";
  
  constructor(
    private http : HttpClient,
    private loginService : LoginService ) 
  { 
    this.token = this.loginService.Token();
    this.headers = new HttpHeaders().set("token", this.token).set("Content-Type", "application/json");
  }


  servicios()
  {
    return this.http.get<IServicio[]>(environment.baseURL + "/servicios/all", {headers : this.headers}  ).toPromise()
  }
  

  nuevo_servicio (servicioModel)
  {
    var servicio = servicioModel


    return this.http.post(environment.baseURL + "/servicios/new", {servicio} ,{headers : this.headers}  ).toPromise()
  }

  eliminar_servicio(servicioId)
  {
    return this.http.post(environment.baseURL + "/servicios/eliminar/"+servicioId ,{},{headers : this.headers}  ).toPromise()
  }


}
