import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment.prod';
import { IVisita } from '../models/visitaModel';
import { IVivienda } from '../models/viviendaModel';

@Injectable({
  providedIn: 'root'
})
export class ViviendaService {
  private headers:any;
  private token:string = "";
  
  constructor(
    private http : HttpClient,
    private loginService : LoginService ) 
  { 
    this.token = this.loginService.Token();
    this.headers = new HttpHeaders().set("token", this.token).set("Content-Type", "application/json");
  }


  viviendas()
  {
    return this.http.get<IVisita[]>(environment.baseURL + "/vivienda/all", {headers : this.headers}  ).toPromise()
  }
  
  mis_visitas()
  {
    return this.http.get<IVisita[]>(environment.baseURL + "/visita/misVisitas", {headers : this.headers}  ).toPromise()
  }


  viviendaById(viviendaid)
  {
    return this.http.get<IVivienda>(environment.baseURL + "/vivienda/ById/"+viviendaid, {headers : this.headers}  ).toPromise()
  }

  nueva_vivienda(viviendaModel)
  {
    var vivienda = viviendaModel

    return this.http.post(environment.baseURL + "/vivienda/new", {vivienda} ,{headers : this.headers}  ).toPromise()
  }

  eliminar_vivienda(viviendaId)
  {
    return this.http.post(environment.baseURL + "/vivienda/eliminar/"+viviendaId ,{},{headers : this.headers}  ).toPromise()
  }

  eliminar_servicio_vivienda(id)
  {
    return this.http.get(environment.baseURL + "/servicios/eliminarServicioVivienda/"+id ,{headers : this.headers}  ).toPromise()
  }

  nuevo_servicio_vivienda(viviendaServicio)
  {
    
    return this.http.post(environment.baseURL + "/vivienda/newViviendaServicio/" , {viviendaServicio}, {headers : this.headers}  ).toPromise()
  }



}
