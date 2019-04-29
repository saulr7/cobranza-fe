import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment.prod';
import { IAnuncio } from '../models/anuncioModel';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  private headers:any;
  private token:string = "";
  
  constructor(
    private http : HttpClient,
    private loginService : LoginService ) 
  { 
    this.token = this.loginService.Token();
    this.headers = new HttpHeaders().set("token", this.token).set("Content-Type", "application/json");
  }


  anuncios()
  {
    return this.http.get<IAnuncio[]>(environment.baseURL + "/anuncios/all", {headers : this.headers}  ).toPromise()
  }
  

  nuevo_anuncio (anuncioModel)
  {
    var anuncio = anuncioModel

    console.log(anuncio);

    return this.http.post(environment.baseURL + "/anuncios/new", {anuncio} ,{headers : this.headers}  ).toPromise()
  }

  eliminar_anuncio(anuncioId)
  {
    return this.http.post(environment.baseURL + "/anuncios/eliminar/"+anuncioId ,{},{headers : this.headers}  ).toPromise()
  }


}
