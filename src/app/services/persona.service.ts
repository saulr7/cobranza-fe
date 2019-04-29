import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { IPersona } from '../models/personaModel';
import { IVivienda } from '../models/viviendaModel';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

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
    return this.http.get<IPersona[]>(environment.baseURL + "/persona/all", {headers : this.headers}  ).toPromise()
  }


  nueva_persona(persona : IPersona)
  {
    return this.http.post<IPersona>(environment.baseURL + "/persona/new",{persona}, {headers : this.headers}  ).toPromise()
  }

  viviendas_by_persona(personaId)
  {

    return this.http.get<IVivienda[]>(environment.baseURL + "/persona/viviendas/"+personaId, {headers : this.headers}  ).toPromise()
  }

  buscar_persona_ById(personaId)
  {
    
    return this.http.get<IPersona>(environment.baseURL + "/persona/datosGenerales/"+personaId, {headers : this.headers}  ).toPromise()
  }

  eliminar_persona(personaId)
  {
    
    return this.http.get(environment.baseURL + "/persona/eliminar/"+personaId, {headers : this.headers}  ).toPromise()
  }



}

