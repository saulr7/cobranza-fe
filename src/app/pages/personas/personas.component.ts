import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import Swal from 'sweetalert2'
import { IPersona } from 'src/app/models/personaModel';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html'
})
export class PersonasComponent implements OnInit {

  Titulo:string = "Personas";
  cargando:boolean = false;
  hayDatosParaMostrar:boolean =true;
  personas :IPersona[] = [];

  constructor(
    private personaService : PersonaService
  ) { }

  ngOnInit() {
    this.mostrar_personas();
  }

  mostrar_personas()
  {
    this.cargando = true
    this.personaService.mostrar_todas()
    .then((personas)=>
    {
      personas.forEach(persona => {
        this.personas.push(persona)
      });
      this.cargando = false;
      if(this.personas.length >0)
        this.hayDatosParaMostrar = true
      else
        this.hayDatosParaMostrar = false
      

    })
    .catch((err)=>
    {
      console.log(err);
      this.cargando = false;
      Swal("Ha sucedido un error al obtener los datos, " + err.error.Message,"Error",'error') 
    })
  }




}
