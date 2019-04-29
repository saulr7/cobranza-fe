import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment.prod';
import { IVisita } from '../models/visitaModel';

@Injectable({
  providedIn: 'root'
})
export class VisitasService {

  private headers:any;
  private token:string = "";
  
  constructor(
    private http : HttpClient,
    private loginService : LoginService ) 
  { 
    this.token = this.loginService.Token();
    this.headers = new HttpHeaders().set("token", this.token).set("Content-Type", "application/json");
  }


  visitas()
  {
    return this.http.get<IVisita[]>(environment.baseURL + "/visita/all", {headers : this.headers}  ).toPromise()
  }
  
  mis_visitas()
  {
    return this.http.get<IVisita[]>(environment.baseURL + "/visita/misVisitas", {headers : this.headers}  ).toPromise()
  }


  nueva_visita(visitaModel)
  {
    var visita = visitaModel

    return this.http.post(environment.baseURL + "/visita/new", {visita} ,{headers : this.headers}  ).toPromise()
  }

  eliminar_visita(visitaId)
  {
    return this.http.post(environment.baseURL + "/visita/eliminar/"+visitaId ,{},{headers : this.headers}  ).toPromise()
  }


}
