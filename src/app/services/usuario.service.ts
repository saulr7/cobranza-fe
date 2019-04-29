import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment.prod';
import { ITipoUsuario } from '../models/tipoUsuarioModel';
import { IUsuario } from '../models/usuarioModel';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private headers:any;
  private token:string = "";
  
  constructor(
    private http : HttpClient,
    private loginService : LoginService ) 
  { 
    this.token = this.loginService.Token();
    this.headers = new HttpHeaders().set("token", this.token).set("Content-Type", "application/json");
  }


  tipo_usuarios()
  {
    return this.http.get<ITipoUsuario[]>(environment.baseURL + "/usuario/tipoUsuarios", {headers : this.headers}  ).toPromise()
  }
  

  obtener_usuario_byPersona(personaId)
  {
    return this.http.get<IUsuario>(environment.baseURL + "/usuario/byPersona/"+personaId, {headers : this.headers}  ).toPromise()
  }

  nuevo_usuario (personaId, tipoUsuarioId)
  {

    return this.http.post(environment.baseURL + "/usuario/new/"+personaId+"/"+tipoUsuarioId,{},{headers : this.headers}  ).toPromise()
  }

  eliminar_anuncio(anuncioId)
  {
    return this.http.post(environment.baseURL + "/anuncios/eliminar/"+anuncioId ,{},{headers : this.headers}  ).toPromise()
  }


}
