import { Component, OnInit  } from '@angular/core';
import Swal from 'sweetalert2'
import {LoginService} from '../../services/login/login.service';
import {ILogin} from '../../models/login/ILogin';
import {Router} from '@angular/router';
import {NavbarService} from '../../services/navbar/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Titulo: string = "Inicio de sesión"
  login = new ILogin();
  txtUsuario:string = "";
  txtPassword:string = "";
  cargando:boolean = false;
  btnGuardarEnable:boolean = true;
  pantallas = [];

  constructor(
      private loginService : LoginService
    , private router : Router
    , private navBar : NavbarService
  ) { }

  ngOnInit() 
  {

    this.navBar.hide();
  }

  iniciar_sesion()
  {
   
    try 
    {  
      this.cargando =true;
      this.btnGuardarEnable = false;
      if(!this.datos_validos())
        {
          this.cargando =false;
          this.btnGuardarEnable = true;
          return
        }
  
      this.login.usuario = this.txtUsuario;
      this.login.password = this.txtPassword;

     this.loginService.Login(this.login)
     .then(response=>
      {
        var token = JSON.stringify(response)
        localStorage.setItem("token", token)
        
        var payload = this.loginService.TokenPayload()
        var pantallasUsuario =  payload.Pantallas
        localStorage.setItem("menu", pantallasUsuario )
        localStorage.setItem("usuario", payload.Nombre) 

        this.navBar.show();
        if(payload.PerfilId == 3)
          this.router.navigate(["/marcarEntradaSalida"]);
        else
          this.router.navigate(["/misSolicitudes"]);
        this.cargando =false;
        this.btnGuardarEnable = true;
        
  
      }).catch((response)=>
      {
        var mensajeError = (response.error.Message == undefined ?  response.message : response.error.Message)
        Swal("No se ha podido iniciar sesión," + mensajeError,"Error",'error') 
        this.cargando =false;
        this.btnGuardarEnable = true;
        var btnEntrar = document.getElementById('btnEntrar')
        btnEntrar.focus();
        
      })
     
      
    } 
    catch (error) 
    {
      Swal('No se ha podido iniciar sesión','Error','error' )
      this.cargando =false;
      this.btnGuardarEnable = true;
    }
    finally
    {
      
    }

  }



  datos_validos(): boolean
  {
    if(!this.txtUsuario )
      {
        Swal('Debes ingresar un usuario válido','Atención','warning' )
        return false;
      }
    if(!this.txtPassword)
      {
        Swal('Debes ingresar una contraseña válida','Atención','warning' )
        return false;
      }

      return true;

  }

  onKeydown(event) 
  {
    if (event.key === "Enter") 
      {
        this.iniciar_sesion();
        var btnEntrar = document.getElementById('btnEntrar')
        btnEntrar.focus();
      }
    
  }

}
