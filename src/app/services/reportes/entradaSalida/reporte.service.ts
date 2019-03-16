import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from  '@angular/common/http';
import {LoginService} from '../../login/login.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class ReporteService { 

  private token:string = ""
  private headers:any;
  private _url: string = "";
  
 
  constructor(
    private http: HttpClient
    ,private loginService : LoginService
  ) { 
    this.token = this.loginService.Token();
    this.headers = new HttpHeaders().set("Authorization", "Bearer " + this.token);
  }



  ver_solicitud(fechaDesde: string, fechaHasta: string , AreaId:number)
  {
   
    var params =   {
            "FechaDesde" : fechaDesde,
            "FechaHasta" : fechaHasta,
            "AreaId" : AreaId
          }
      
    this._url = "/reporteria/obtenerHistorialSolicitudes/"
    return this.http.post<any[]>( environment.baseURL + this._url, params, { headers : this.headers}  ).toPromise()

  }

}
