import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment.prod';
import { IFactura } from '../models/facturaModel';
import { IFacturaPeriodoModel } from '../models/facrturaPeridoModel';
import { IFacturaCompleta } from '../models/facturaCompletaModel';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private headers:any;
  private token:string = "";
  
  constructor(
    private http : HttpClient,
    private loginService : LoginService ) 
  { 
    this.token = this.loginService.Token();
    this.headers = new HttpHeaders().set("token", this.token).set("Content-Type", "application/json");
  }


  generar_facturas(facturaModel)
  {
    var factura = facturaModel
    console.log(factura);
    return this.http.post(environment.baseURL + "/factura/generar", { factura } , {headers : this.headers}  ).toPromise()
  }

  facturas_pendientes_vivienda(viviendaId)
  {
    return this.http.get<IFactura[]>(environment.baseURL + "/factura/pendientes/"+viviendaId , {headers : this.headers}  ).toPromise()
  }

  facturaById(facturaId)
  {
    return this.http.get<IFacturaCompleta>(environment.baseURL + "/factura/facturaById/"+facturaId , {headers : this.headers}  ).toPromise()
  }

  pagar_factura(facturaModel)
  {
    var factura = facturaModel
    return this.http.post(environment.baseURL + "/factura/pagar", { factura } , {headers : this.headers}  ).toPromise()
  }


  mis_facturas()
  {
    return this.http.get <IFactura[]> (environment.baseURL + "/factura/misFacturas", {headers : this.headers}  ).toPromise()
  }

  periodos_facturados()
  {
    return this.http.get <IFacturaPeriodoModel> (environment.baseURL + "/factura/periodos", {headers : this.headers}  ).toPromise()
  }

  facturas_Byperiodo(Anio, Mes)
  {
    return this.http.get <IFactura[]> (environment.baseURL + "/factura/ByPeriodo/"+Anio +"/"+Mes, {headers : this.headers}  ).toPromise()
  }


  es_factura_pagada(FechaPago, Pagada, Anulada, FechaAnulada): boolean
  {

    if(FechaPago == null)
    {
      return false
    }

    if(Pagada == false)
    {
      return false
    }

    if(Anulada == true)
    {
      return false
    }
    
    if(FechaAnulada != null)
    {
      return false
    }


    return true
  }


}
