import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from  '@angular/common/http';
import {LoginService} from '../login/login.service';
import { environment } from 'src/environments/environment.prod';
import {IAccesos} from '../../models/menu/accesos';

@Injectable({
  providedIn: 'root'
})
export class OpcionesMenuService {

  private token:string = ""
  private headers:any;
  private _url :string = "";

  constructor(
      private loginService : LoginService
    , private http : HttpClient
  ) {
    this.token = this.loginService.Token();
    this.headers = new HttpHeaders().set("Authorization", "Bearer " + this.token);
   }



}
