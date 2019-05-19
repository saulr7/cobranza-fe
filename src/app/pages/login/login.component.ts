import { Component, OnInit  } from '@angular/core';
import Swal from 'sweetalert2'
import {LoginService} from '../../services/login.service';
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
      private loginService : LoginService,
      private router : Router,
      private navBar : NavbarService
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
        
        var data = this.loginService.TokenPayload()
        console.log(data);
        var pantallasUsuario =  data.payload.pantallas
        localStorage.setItem("menu", JSON.stringify( pantallasUsuario) )
        localStorage.setItem("usuario", data.payload.nombre) 


        this.navBar.show();

        if(data.payload.tipoUsuarioId == 1)
          this.router.navigate(["/personas"]);
        
        if(data.payload.tipoUsuarioId == 2)
          this.router.navigate(["/anuncios"]);

        if(data.payload.tipoUsuarioId == 3)
          this.router.navigate(["/visitas"]);

        // else
        //   this.router.navigate(["/anuncios"]);

        this.cargando =false;
        this.btnGuardarEnable = true;
        
  
      }).catch((err)=>
      {
        console.log(err.error.message.message);
        var mensajeError = (err.error.message.message == undefined ?  err.message : err.error.message.message)
        Swal("No se ha podido iniciar sesión, " + mensajeError,"Error",'error') 
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
