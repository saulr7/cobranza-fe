import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from  '@angular/common/http';
import {LoginService} from '../login/login.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MotivosService {

  private token:string = ""
  private headers:any;
  private _url: string = "";

  constructor
  (
      private http: HttpClient
    , private loginService : LoginService
  ) 
  { 
    this.token = this.loginService.Token();
    this.headers = new HttpHeaders().set("Authorization", "Bearer " + this.token);
  }




  obtener_motivos_todos()
  {
    this._url = "/maestros/obtenerMotivosSalidaTodos"
    return this.http.get<any[]>( environment.baseURL + this._url ,{ headers : this.headers}  ).toPromise()
    
  }


  guardar_motivo_salida(nuevoMotivo)
  {
  
  var params = {  Descripcion : nuevoMotivo.Descripcion,
          ObservacionObligatoria : nuevoMotivo.ObservacionObligatoria,
          Activo : nuevoMotivo.Activo
        }

    this._url = "/maestros/guardarMotivoSalida"
    return this.http.post<any[]>( environment.baseURL + this._url, params ,{ headers : this.headers}  ).toPromise()
  }


  actualizar_motivo_salida(motivoSalida)
  {
    var params = {  
                    Id : motivoSalida.Id,
                    Descripcion : motivoSalida.Descripcion,
                    ObservacionObligatoria : motivoSalida.ObservacionObligatoria,
                    Activo : motivoSalida.Activo
                  }

    this._url = "/maestros/modificarMotivoSalida"
    return this.http.post<any[]>( environment.baseURL + this._url, params ,{ headers : this.headers}  ).toPromise()
  }

}
