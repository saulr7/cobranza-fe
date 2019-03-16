import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from  '@angular/common/http';
import {LoginService} from '../login/login.service';
import { environment } from 'src/environments/environment.prod';
import {ISolicitud} from '../../models/solicitudes/solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  
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


  solicitudes( codigoEmpleado:number, fechaDesde: string, fechaHasta: string)
  {
    if(codigoEmpleado <= 0)  
        return

    var params = new HttpParams().set("ColaboradorId", codigoEmpleado.toString()).set("FechaDesde", fechaDesde).set("FechaHasta", fechaHasta)

    this._url = "/solicitudesPases/obtenerSolicitudesColaborador"
    return this.http.post<any[]>( environment.baseURL + this._url, params ,{ headers : this.headers}  ).toPromise()
  
  }

  ver_solicitud(solicitudId, esSolicitudRecurrente:boolean = false)
  {

    if(solicitudId <= 0)
      return

      if(esSolicitudRecurrente)
        this._url = "/paseRecurrente/obtenerInformacionCompleta/"+solicitudId
      else
        this._url = "/solicitudesPases/obtenerInformacionCompletaSolicitud/"+solicitudId
        

    return this.http.get<ISolicitud>( environment.baseURL + this._url, { headers : this.headers}  ).toPromise() 

  }


  cancelar_solicitud(solicitudId:number)
  {
    this._url = "/solicitudesPases/cancelarSolicitud/"+solicitudId
    return this.http.get<any[]>( environment.baseURL + this._url, { headers : this.headers}  ).toPromise()
  }


  solicitudes_recibidas (codigoEmpleado:number, fechaDesde: string, fechaHasta: string)
  {
    var params = new HttpParams().set("ColaboradorId", codigoEmpleado.toString()).set("FechaDesde", fechaDesde).set("FechaHasta", fechaHasta)

    this._url = "/solicitudesPases/obtenerSolicitudesAreaAprobador"
    return this.http.post<any[]>( environment.baseURL + this._url, params ,{ headers : this.headers}  ).toPromise()
  }


  aprobar_solicitud(solicitudId:number,  esSolicitudRecurrente:boolean = false)
  {
    if(esSolicitudRecurrente)
      this._url = "/paseRecurrente/aprobarPaseRecurrente/"+solicitudId
    else
      this._url = "/solicitudesPases/aprobarSolicitud/"+solicitudId
      return this.http.get<any[]>( environment.baseURL + this._url , { headers : this.headers}  ).toPromise()
  }

  denegar_solicitud(solicitudId:number, esSolicitudRecurrente:boolean = false)
  {
    if(esSolicitudRecurrente)
      this._url = "/paseRecurrente/denegarPaseRecurrente/"+solicitudId
    else
      this._url = "/solicitudesPases/denegarSolicitud/"+solicitudId
    return this.http.get<any[]>( environment.baseURL + this._url , { headers : this.headers}  ).toPromise()
  }


  obtener_solicitudes_de_hoy()
  {
    this._url = "/solicitudesPases/obtenerSolicitudesDeHoy"
    return this.http.get<any[]>( environment.baseURL + this._url ,  { headers : this.headers}  ).toPromise()
  }


  solicitud_marcar_salida(solicitudId:number)
  {
    this._url = "/solicitudesPases/marcarSalida/"+solicitudId
    return this.http.get<any[]>( environment.baseURL + this._url ,  { headers : this.headers}  ).toPromise() 
  }

  solicitud_marcar_entrada(solicitudId:number)
  {
    this._url = "/solicitudesPases/marcarEntrada/"+solicitudId
    return this.http.get<any[]>( environment.baseURL + this._url ,  { headers : this.headers}  ).toPromise() 
  } 


  crear_solicitud(nuevaSolicitud:any)
  {
    this._url = "/solicitudesPases/guardarSolicitud"
    return this.http.post<any[]>( environment.baseURL + this._url,  nuevaSolicitud, { headers : this.headers}).toPromise()
  }


  crear_solicitud_recurrente(nuevaSolicitud:any)
  {
    this._url = "/paseRecurrente/guardarNuevoPase"
    return this.http.post<any[]>( environment.baseURL + this._url,  nuevaSolicitud, { headers : this.headers}).toPromise()
  }


  reasignar_solicitud(SolicitudId :number, UsuarioAutorizaId :number)
  {

    this._url = "/solicitudesPases/cambiarAutorizadorSolicitud"

    var params = {
      "SolicitudId" : SolicitudId,
      "UsuarioAutorizaId" :  UsuarioAutorizaId
    }
    return this.http.post<any[]>( environment.baseURL + this._url,  params, { headers : this.headers}).toPromise()
  }

}
