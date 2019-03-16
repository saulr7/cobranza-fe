import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  Titulo: string = "Mis Solicitudes";

  estado: string = "pendiente";
  nombre:string = "Saul Fernando Ramirez Figueroa"

  constructor() { }

  ngOnInit() {

    var nombreParseado = this.nombre.split(" ")
    console.log(nombreParseado);
    
  }


  cambiar_estado(estado)
  {

    if(!estado)
      return

      this.estado = estado;

  }

}
