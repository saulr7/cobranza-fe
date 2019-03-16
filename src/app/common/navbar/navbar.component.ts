import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import {NavbarService} from '../../services/navbar/navbar.service';
import {LoginService} from '../../services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  @Input() public mostrarEnlaces:boolean = true;

  Titulo:string = "Inicio"
  empleadoNombre: string = "";
  empleadoCodigo: number = 0;
  pantallas = []

  opcionesMenu =[
    {Nombre : "Inicio"}, {Nombre : "Inicio2"} , {Nombre : "Inicio3"} , {Nombre : "Inicio3"} 
  ]

  constructor(
      private router : Router
    , public navBar : NavbarService
    , private loginService : LoginService
  ) { }

  ngOnInit() 
  {
    this.obtener_usuario_logueado();
    this.obtener_opciones_menu();
    this.usuario_nombre();
  }


  estaLogueado() : boolean
  {
    const token = localStorage.getItem('token')

    if(token)
      return true
    else
      return false
  }

  cerrar_sesion()
  {
    this.loginService.LogOut();
    this.router.navigate(['/login']);
  }

  obtener_usuario_logueado()
  {
    var payload = this.loginService.TokenPayload()
    if(!payload)
      return
    this.empleadoCodigo = payload.Id;
  }

  usuario_nombre()
  {
    this.empleadoNombre = localStorage.getItem("usuario")
    return this.empleadoNombre 
  }

  obtener_opciones_menu()
  {
    var pantallasString = localStorage.getItem("menu")
    this.pantallas = JSON.parse(pantallasString)
    return this.pantallas;
  }



}
