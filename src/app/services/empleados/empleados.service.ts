import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from  '@angular/common/http';
import {LoginService} from '../login.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

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

  colaboradores_autorizan(empleadoCodigo:number)
  {
    this._url = "/colaborador/obtenerColaboradoresAprueban/"+empleadoCodigo
    return this.http.get<any[]>( environment.baseURL + this._url, { headers : this.headers}  ).toPromise()
  }


  colaboradores(empleadoCodigo:number)
  {
    this._url = "/colaborador/obtenerCompanerosArea/"+empleadoCodigo
    return  this.http.get<any[]>( environment.baseURL + this._url, { headers : this.headers}  ).toPromise()
  }


  buscar_colaborador( codigoONombre:any) 
  {
    if(!codigoONombre)  
        return

      this._url = "/colaborador/buscarColaborador"
      var params = new HttpParams().set("busqueda", codigoONombre)

      return this.http.post<any[]>( environment.baseURL + this._url, params,  { headers : this.headers}  ).toPromise()
  }

  
  obtener_areas()
  {
    this._url = "/maestros/obtenerAreas"
    return this.http.get<any[]>( environment.baseURL + this._url,  { headers : this.headers}  ).toPromise()
  }

  obtener_colaboradores_por_area(areaId: number)
  {
    this._url = "/usuarios/obtenerColaboradoresPorArea/"+areaId
    return this.http.get<any[]>( environment.baseURL + this._url,  { headers : this.headers}  ).toPromise()
  }


  toggle_habilita_colaborador(empleadoId: number, activo:boolean)
  {
    this._url = "/usuarios/activarDesactivarUsuario/"
    var params = { UsuarioId  : empleadoId, Activo : activo}
    return this.http.post<any[]>( environment.baseURL + this._url, params ,{ headers : this.headers}  ).toPromise()
  }

  toggle_aprueba_colaborador(empleadoId: number, aprueba:boolean)
  {
    this._url = "/usuarios/gestionarPermisoAprobacion/"
    var params = {UsuarioId : empleadoId, ApruebaSolicitud : aprueba}
    return this.http.post<any[]>( environment.baseURL + this._url, params ,{ headers : this.headers}  ).toPromise()
    
  }


  obtener_perfiles()
  {
    this._url = "/maestros/obtenerPerfiles/"
    return this.http.get<any[]>( environment.baseURL + this._url ,{ headers : this.headers}  ).toPromise()
  }


  cambiar_perfil(usuarioId:number, perfilId:number)
  {
    var params = { UsuarioId  : usuarioId , PerfilId : perfilId }
    this._url = "/usuarios/cambiarPerfilUsuario/"
    return this.http.post<any[]>( environment.baseURL + this._url, params ,{ headers : this.headers}  ).toPromise()
  }

}


