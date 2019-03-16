import { Injectable } from '@angular/core';
import {ILogin} from '../../models/login/ILogin';
import { logging } from 'protractor';
import {Router} from '@angular/router';
import {NavbarService} from '../navbar/navbar.service';
import { HttpClient} from  '@angular/common/http';
import Swal from 'sweetalert2'
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _urlApi : string = "";
  constructor(
     private router : Router
    ,private http : HttpClient
  ) { 
  }




  Login(login : ILogin)
  {
    if(!login.usuario)
        throw "El usuario es necesario para realizar el login"
    if(!login.password)
        throw "La contraseña es necesaria para realizar el login"

    var params = { Usuario : login.usuario, Clave : login.password}

    return this.http.post(environment.baseURL + "/login/autenticacion", params ).toPromise()

  }

  IsLogIn()
  {
    var token = localStorage.getItem("token");

    if(!token)
      {
        this.router.navigate(["/login"])
        return false
      }

    else
    {
      if(this.TokenHasExpirated())
      {
        this.router.navigate(["/login"])
        return false
      }
      else
        return true
    }

  }

  Token()
  {
    var token = localStorage.getItem("token")
    if(!token || token == null)
    {
      this.router.navigate(["/login"])
      return "";
    }
    else
    {
      token = token.replace("\"", "").replace("\"", "");
      return token;
    }

   
  }

  LogOut()
  {
    localStorage.removeItem("token")
    localStorage.removeItem("menu")
    localStorage.removeItem("usuario")
    // localStorage.clear();
    location.reload();
  }


  TokenPayload()
  {
    var token = this.Token();
    if(!token)
      return
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var payload = JSON.parse(atob(base64));
    return payload;
  }

  TokenHasExpirated(): boolean
  {
    var jwt = this.TokenPayload();
    
    var horaActual = new Date().getTime() / 1000;

    if (horaActual < jwt.exp)
      return false
    else  
      {
       location.reload()
        return true
      }

    

  }
  
}
